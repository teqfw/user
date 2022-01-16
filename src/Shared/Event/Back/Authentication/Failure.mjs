/**
 * User cannot be authenticated by backend.
 *
 * User encrypt payload he got from the back but back cannot decrypt encrypted payload with user's public key.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Event_Back_Authentication_Failure';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Event_Back_Authentication_Failure
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    reason;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_User_Shared_Event_Back_Authentication_Failure {
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
         * @param {TeqFw_User_Shared_Event_Back_Authentication_Failure.Dto} [data]
         * @return {TeqFw_User_Shared_Event_Back_Authentication_Failure.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.reason = castString(data?.reason);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: TeqFw_User_Shared_Event_Back_Authentication_Failure.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_User_Shared_Event_Back_Authentication_Failure.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
