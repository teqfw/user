/**
 * New public key is generated for user on the front.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Event_Front_User_Key_New';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Event_Front_User_Key_New
 */
class Dto {
    static namespace = `${NS}.Dto`;
    /**
     * Base64 encoded key.
     * @type {string}
     */
    publicKey;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_User_Shared_Event_Front_User_Key_New {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_User_Shared_Event_Front_User_Key_New.Dto} [data]
         * @return {TeqFw_User_Shared_Event_Front_User_Key_New.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.publicKey = castString(data?.publicKey);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_User_Shared_Event_Front_User_Key_New.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_User_Shared_Event_Front_User_Key_New.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
         */
        this.createDto = function (data) {
            const res = dtoBase.createDto({[ATTR.META]: data?.[ATTR.META]});
            res.meta.name = NS;
            res.data = createData(data?.[ATTR.DATA]);
            // noinspection JSValidateTypes
            return res;
        }

        this.getEventName = () => NS;
    }
}
