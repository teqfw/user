/**
 * Process to authenticate frontend user and bind streamUUID with userId.
 *
 * @namespace TeqFw_User_Back_Proc_Authenticate
 */
export default class TeqFw_User_Back_Proc_Authenticate {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {TeqFw_Web_Back_Event_Stream_Reverse_Opened} */
        const ebReverseOpened = spec['TeqFw_Web_Back_Event_Stream_Reverse_Opened$'];
        /** @type {TeqFw_User_Shared_Event_Back_Authenticate} */
        const esbAuthenticate = spec['TeqFw_User_Shared_Event_Back_Authenticate$'];
        /** @type {TeqFw_User_Shared_Event_Back_Authentication_Failure} */
        const esbFailure = spec['TeqFw_User_Shared_Event_Back_Authentication_Failure$'];
        /** @type {TeqFw_User_Shared_Event_Front_Authenticate_Confirm} */
        const esfAuthConfirm = spec['TeqFw_User_Shared_Event_Front_Authenticate_Confirm$'];
        /** @type {TeqFw_User_Back_Event_Authenticated} */
        const ebAuthenticated = spec['TeqFw_User_Back_Event_Authenticated$'];
        /** @type {TeqFw_Web_Shared_Api_Crypto_IScrambler} */
        const scrambler = spec['TeqFw_Web_Shared_Api_Crypto_IScrambler$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
        const metaUser = spec['TeqFw_User_Back_Store_RDb_Schema_User$'];
        /** @type {TeqFw_Web_Back_Mod_Server_Key} */
        const dsServerKey = spec['TeqFw_Web_Back_Mod_Server_Key$'];
        /** @type {TeqFw_Web_Back_Mod_Event_Reverse_Registry} */
        const regStreams = spec['TeqFw_Web_Back_Mod_Event_Reverse_Registry$'];
        /** @type {TeqFw_User_Back_Mod_Event_Stream_Registry} */
        const regUsers = spec['TeqFw_User_Back_Mod_Event_Stream_Registry$'];

        // MAIN
        eventsBack.subscribe(ebReverseOpened.getEventName(), onReverseOpen);
        eventsBack.subscribe(esfAuthConfirm.getEventName(), onFrontConfirm);

        // ENCLOSED FUNCTIONS
        /**
         * Send streamUUID as plain text to encrypt and sign by user.
         * @param {TeqFw_Web_Back_Event_Stream_Reverse_Opened.Dto} data
         * @param {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} meta
         */
        function onReverseOpen({data, meta}) {
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
        async function onFrontConfirm({data, meta}) {
            // ENCLOSED FUNCTIONS
            async function getUserKey(trx, userId) {
                /** @type {TeqFw_User_Back_Store_RDb_Schema_User.Dto} */
                const one = await crud.readOne(trx, metaUser, userId);
                return one?.key_pub;
            }

            /**
             * Send authentication failure event to the front.
             * @param {string} frontUUID
             * @param {string} reason
             * @return {Promise<void>}
             */
            async function publishFailure(frontUUID, reason) {
                const msg = esbFailure.createDto();
                msg.meta.frontUUID = frontUUID;
                msg.data.reason = reason;
                portalFront.publish(msg);
            }

            // MAIN
            const userId = data.userId;
            const encrypted = data.encryptedText;
            const frontUUID = meta.frontUUID;
            if (encrypted) {
                const trx = await conn.startTransaction();
                try {
                    const pub = await getUserKey(trx, userId);
                    const sec = await dsServerKey.getSecret();
                    scrambler.setKeys(pub, sec);
                    const streamUUIID = scrambler.decryptAndVerify(encrypted);
                    if (streamUUIID) {
                        const stream = regStreams.get(streamUUIID);
                        if (stream) {
                            regUsers.add(userId, streamUUIID);
                            logger.info(`User #${userId} for stream '${streamUUIID}' is authenticated successfully.`);
                            const eventAuth = ebAuthenticated.createDto();
                            eventAuth.data.userId = userId;
                            eventsBack.publish(eventAuth);
                        } else {
                            const msg = `There is no opened stream '${streamUUIID}' for authenticated user #${userId}.`;
                            logger.info(msg);
                            await publishFailure(frontUUID, msg);
                        }
                    } else {
                        logger.error(`Cannot authenticate user #${userId}. Payload decryption is failed.`);
                        await publishFailure(frontUUID, 'Payload decryption is failed.');
                    }
                    await trx.commit();
                } catch (e) {
                    logger.error(e?.message);
                    await publishFailure(frontUUID, e?.message);
                    await trx.rollback();
                }
            } else {
                const msg = `User for front '${frontUUID}' is not authenticated (encrypted payload is missed).`;
                logger.info(msg);
                await publishFailure(frontUUID, msg);
            }
        }
    }
}
