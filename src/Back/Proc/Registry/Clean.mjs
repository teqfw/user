/**
 * Process to clean up users connections registry on events stream close.
 *
 * @namespace TeqFw_User_Back_Proc_Registry_Clean
 */
export default class TeqFw_User_Back_Proc_Registry_Clean {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_User_Back_Mod_Event_Stream_Registry} */
        const regUsers = spec['TeqFw_User_Back_Mod_Event_Stream_Registry$'];
        /** @type {TeqFw_Web_Back_Event_Stream_Reverse_Closed} */
        // const ebClosed = spec['TeqFw_Web_Back_Event_Stream_Reverse_Closed$'];

        // MAIN
        // eventsBack.subscribe(ebClosed.getEventName(), onReverseClose);

        // ENCLOSED FUNCTIONS
        /**
         * Remove stream from registry when stream closes itself.
         * @param {TeqFw_Web_Back_Event_Stream_Reverse_Closed.Dto} data
         * @param {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} meta
         */
        function onReverseClose({data, meta}) {
            const frontUUID = data.frontUUID;
            const streamUUID = data.streamUUID;
            regUsers.deleteStream(streamUUID);
            logger.info(`Front '${frontUUID}' is removed from user's streams registry.`);
        }
    }
}
