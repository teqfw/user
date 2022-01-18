/**
 * Backend local event 'User is successfully authenticated'.
 *
 * @namespace TeqFw_User_Back_Event_Authenticated
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Event_Authenticated';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Back_Event_Authenticated
 */
class Dto {
    static namespace = NS;
    /**
     * User ID on backend.
     * @type {number}
     */
    userId;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class TeqFw_User_Back_Event_Authenticated {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_App_Event_Message} */
        const dtoBase = spec['TeqFw_Core_Shared_App_Event_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {TeqFw_User_Back_Event_Authenticated.Dto} [data]
         * @return {TeqFw_User_Back_Event_Authenticated.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.userId = castInt(data?.userId);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{[data]: TeqFw_User_Back_Event_Authenticated.Dto, [meta]: TeqFw_Core_Shared_App_Event_Message_Meta.Dto}} [data]
         * @return {{data: TeqFw_User_Back_Event_Authenticated.Dto, meta: TeqFw_Core_Shared_App_Event_Message_Meta.Dto}}
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
