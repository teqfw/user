/**
 * Process to authenticate frontend user and pin front UUID to userId.
 *
 * @namespace TeqFw_User_Back_Proc_Authenticate
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Proc_Authenticate';

// MODULE'S CLASSES
export default class TeqFw_User_Back_Proc_Authenticate {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Back_Event_Stream_Reverse_Opened} */
        const ebReverseOpened = spec['TeqFw_Web_Back_Event_Stream_Reverse_Opened$'];
        /** @type {TeqFw_User_Shared_Event_Back_Authenticate} */
        const esbAuthenticate = spec['TeqFw_User_Shared_Event_Back_Authenticate$'];
        /** @type {TeqFw_User_Shared_Event_Front_Authenticate_Confirm} */
        const esfAuthConfirm = spec['TeqFw_User_Shared_Event_Front_Authenticate_Confirm$'];
        /** @type {TeqFw_User_Shared_Api_Crypto_IScrambler} */
        const scrambler = spec['TeqFw_User_Shared_Api_Crypto_IScrambler$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
        const metaUser = spec['TeqFw_User_Back_Store_RDb_Schema_User$'];
        /** @type {TeqFw_User_Back_DSource_Server_Key} */
        const dsServerKey = spec['TeqFw_User_Back_DSource_Server_Key$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Registry} */
        const regStreams = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Registry$'];
        /** @type {TeqFw_User_Back_Mod_Event_Stream_Registry} */
        const regUsers = spec['TeqFw_User_Back_Mod_Event_Stream_Registry$'];

        // MAIN
        eventsBack.subscribe(ebReverseOpened.getEventName(), onReverseOpen)
        eventsBack.subscribe(esfAuthConfirm.getEventName(), onConfirm)

        // ENCLOSED FUNCTIONS
        /**
         * Send streamUUID as plain text to encrypt and sign by user.
         * @param {TeqFw_Web_Back_Event_Stream_Reverse_Opened.Dto} data
         * @param {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} meta
         */
        function onReverseOpen({data, meta}) {
            // ENCLOSED FUNCTIONS
            // MAIN
            const frontUUID = data.frontUUID; // browser's ID (permanent)
            const streamUUID = data.streamUUID; // generated for every new connection (one stream per front)
            const msg = esbAuthenticate.createDto();
            msg.meta.frontUUID = frontUUID;
            msg.data.plainText = streamUUID;
            portalFront.publish(msg);
            logger.info(`User authentication request is published for front '${frontUUID}'.`);
        }

        /**
         * Validate authentication confirmation and place frontUUID to user connections registry.
         * @param {TeqFw_User_Shared_Event_Front_Authenticate_Confirm.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         */
        async function onConfirm({data, meta}) {
            // ENCLOSED FUNCTIONS
            async function getUserKey(trx, userId) {
                /** @type {TeqFw_User_Back_Store_RDb_Schema_User.Dto} */
                const one = await crud.readOne(trx, metaUser, userId);
                return one?.key_pub;
            }

            // MAIN
            const encrypted = data.encryptedText;
            const frontUUID = meta.frontUUID;
            if (encrypted) {
                const trx = await conn.startTransaction();
                try {
                    const userId = data.userId;
                    const pub = await getUserKey(trx, userId);
                    const sec = await dsServerKey.getSecret();
                    scrambler.setKeys(pub, sec);
                    const streamUUIID = scrambler.decryptAndVerify(encrypted);
                    if (streamUUIID) {
                        const stream = regStreams.get(streamUUIID);
                        if (stream) {
                            regUsers.add(userId, streamUUIID);
                            logger.info(`User #${userId} for stream '${streamUUIID}' is authenticated successfully.`);
                        } else {
                            logger.info(`There is no opened stream '${streamUUIID}' for authenticated user #${userId}.`);
                        }
                    } else {
                        logger.error(`Cannot authenticate user #${userId}. Payload decryption is failed.`);
                    }
                    await trx.commit();
                } catch (e) {
                    logger.error(e?.message);
                    await trx.rollback();
                }
            } else {
                logger.info(`User for front '${frontUUID}' is not authenticated.`);
            }

        }

        // INSTANCE METHODS

    }
}
