/**
 * Request event to front to authenticate itself.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Event_Back_Authenticate';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Event_Back_Authenticate
 */
class Dto {
    static namespace = NS;
    /**
     * String to encrypt on the client side.
     * @type {string}
     */
    plainText;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_User_Shared_Event_Back_Authenticate {
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
         * @param {TeqFw_User_Shared_Event_Back_Authenticate.Dto} [data]
         * @return {TeqFw_User_Shared_Event_Back_Authenticate.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.plainText = castString(data?.plainText);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_User_Shared_Event_Back_Authenticate.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_User_Shared_Event_Back_Authenticate.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
