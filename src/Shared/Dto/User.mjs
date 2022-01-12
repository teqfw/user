/**
 * Structure for user data.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Dto_User';

/**
 * @memberOf TeqFw_User_Shared_Dto_User
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'dateCreated',
    ID: 'id',
    KEYS: 'keys',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Dto_User
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    dateCreated;
    /** @type {number} */
    id;
    /** @type {TeqFw_User_Shared_Dto_AsymKeys.Dto} */
    keys;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_User_Shared_Dto_User {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_User_Shared_Dto_AsymKeys} */
        const dtoKeys = spec['TeqFw_User_Shared_Dto_AsymKeys$'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {TeqFw_User_Shared_Dto_User.Dto} data
         * @return {TeqFw_User_Shared_Dto_User.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.dateCreated = castDate(data?.dateCreated);
            res.id = castInt(data?.id);
            res.keys = dtoKeys.createDto(data?.keys);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
