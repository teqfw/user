/**
 * Process to encrypt and sign authentication requests from back.
 *
 * @namespace TeqFw_User_Front_Proc_Authenticate
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'TeqFw_User_Front_Proc_Authenticate';

// MODULE'S CLASSES
/**
 * @implements TeqFw_Core_Shared_Api_Event_IProcess
 */
export default class TeqFw_User_Front_Proc_Authenticate {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Front_App_UUID} */
        const frontUUID = spec['TeqFw_Web_Front_App_UUID$'];
        /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
        const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {TeqFw_User_Front_Lib_Nacl.box} */
        const box = spec['TeqFw_User_Front_Lib_Nacl'];
        /** @type {TeqFw_User_Shared_Event_Back_Authenticate} */
        const esbAuth = spec['TeqFw_User_Shared_Event_Back_Authenticate$'];
        /** @type {TeqFw_User_Shared_Event_Front_Authenticate_Confirm} */
        const esfConfirm = spec['TeqFw_User_Shared_Event_Front_Authenticate_Confirm$'];
        /** @type {TeqFw_User_Front_DSource_Server_Key} */
        const dsServerKey = spec['TeqFw_User_Front_DSource_Server_Key$'];
        /** @type {TeqFw_User_Front_DSource_User} */
        const dsUser = spec['TeqFw_User_Front_DSource_User$'];
        /** @type {TeqFw_User_Shared_Api_Crypto_IScrambler} */
        const scrambler = spec['TeqFw_User_Shared_Api_Crypto_IScrambler$'];

        // ENCLOSED VARS

        // MAIN
        eventsFront.subscribe(esbAuth.getEventName(), onAuthenticate);

        // ENCLOSED FUNCTIONS
        /**
         * Encrypt incoming payload and return to the back with confirmation event.
         * @param {TeqFw_User_Shared_Event_Back_Authenticate.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         */
        async function onAuthenticate({data, meta}) {
            const message = esfConfirm.createDto();
            const user = await dsUser.get();
            if (user?.id) {
                // encrypt and sign payload from server
                const keyServerPublic = await dsServerKey.get();
                scrambler.setKeys(keyServerPublic, user.keys.secret);
                message.data.encryptedText = scrambler.encryptAndSign(data.plainText);
                message.data.userId = user.id;
            } // else: just send empty response
            portalBack.publish(message);
        }

        // INSTANCE METHODS
        this.init = async function () { }
        this.run = async function ({}) { }

    }
}
