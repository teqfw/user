/**
 * Response event to back with encrypted data from authentication request.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Event_Front_Authenticate_Confirm';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Event_Front_Authenticate_Confirm
 */
class Dto {
    static namespace = NS;
    /**
     * String to encrypt on the client side.
     * @type {string}
     */
    encryptedText;
    /**
     * User ID on backend.
     * @type {number}
     */
    userId;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_User_Shared_Event_Front_Authenticate_Confirm {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_User_Shared_Event_Front_Authenticate_Confirm.Dto} [data]
         * @return {TeqFw_User_Shared_Event_Front_Authenticate_Confirm.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.encryptedText = castString(data?.encryptedText);
            res.userId = castInt(data?.userId);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_User_Shared_Event_Front_Authenticate_Confirm.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_User_Shared_Event_Front_Authenticate_Confirm.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
