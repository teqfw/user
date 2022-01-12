/**
 * Structure for asymmetric keys.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Shared_Dto_AsymKeys';

/**
 * @memberOf TeqFw_User_Shared_Dto_AsymKeys
 * @type {Object}
 */
const ATTR = {
    PUBLIC: 'public',
    SECRET: 'secret',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Shared_Dto_AsymKeys
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    public;
    /** @type {string} */
    secret;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class TeqFw_User_Shared_Dto_AsymKeys {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {TeqFw_User_Shared_Dto_AsymKeys.Dto} data
         * @return {TeqFw_User_Shared_Dto_AsymKeys.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.public = castString(data?.public);
            res.secret = castString(data?.secret);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
