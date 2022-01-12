/**
 * Process changes in users' public keys. Register new users.
 *
 * @namespace TeqFw_User_Back_Proc_User_Create
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'TeqFw_User_Back_Proc_User_Create';

// MODULE'S CLASSES
export default class TeqFw_User_Back_Proc_User_Create {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_User_Shared_Event_Front_User_Key_New} */
        const esfKeyNew = spec['TeqFw_User_Shared_Event_Front_User_Key_New$'];

        // ENCLOSED VARS


        // MAIN
        eventsBack.subscribe(esfKeyNew.getEventName(), onFrontKeyGenerated);

        // ENCLOSED FUNCTIONS
        /**
         *
         * @param {TeqFw_User_Shared_Event_Front_User_Key_New.Dto} data
         * @param {TeqFw_Core_Shared_App_Event_Message_Meta.Dto} meta
         * @return {Promise<void>}
         */
        async function onFrontKeyGenerated({data, meta}) {
            debugger
        }

        // INSTANCE METHODS
        this.run = async function ({keyPub}) {
            return {}
        }
    }
}

// MODULE'S FUNCTIONS

// MODULE'S MAIN
