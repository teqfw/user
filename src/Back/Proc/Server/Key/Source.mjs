/**
 * Process to distribute server's public key for asymmetric encryption.
 *
 * @namespace TeqFw_User_Back_Proc_Server_Key_Source
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Proc_Server_Key_Source';

// MODULE'S CLASSES
export default class TeqFw_User_Back_Proc_Server_Key_Source {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_User_Back_DSource_Server_Key} */
        const dsKeys = spec['TeqFw_User_Back_DSource_Server_Key$'];
        /** @type {TeqFw_User_Shared_Event_Front_Server_Key_Request} */
        const esfKeyReq = spec['TeqFw_User_Shared_Event_Front_Server_Key_Request$'];
        /** @type {TeqFw_User_Shared_Event_Back_Server_Key_Response} */
        const esbRes = spec['TeqFw_User_Shared_Event_Back_Server_Key_Response$'];

        // ENCLOSED VARS

        // MAIN
        eventsBack.subscribe(esfKeyReq.getEventName(), onRequest)

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_User_Shared_Event_Front_Server_Key_Request.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         */
        async function onRequest({data, meta}) {
            const frontUUID = meta.frontUUID;
            const msg = esbRes.createDto();
            msg.meta.frontUUID = frontUUID;
            msg.data.publicKey = await dsKeys.getPublic();
            portalFront.publish(msg);
        }
    }
}