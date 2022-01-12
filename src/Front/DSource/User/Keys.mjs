/**
 * DataSource for user keys for asymmetric encryption.
 */
export default class TeqFw_User_Front_DSource_User_Keys {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_User_Front_Defaults} */
        const DEF = spec['TeqFw_User_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Store} */
        const store = spec['TeqFw_Web_Front_Store$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/user/keys`;
        let _cache;

        // INSTANCE METHODS
        this.get = async () => {
            if (!_cache) _cache = await store.get(STORE_KEY);
            return _cache;
        }

        this.set = async (data) => {
            _cache = data;
            await store.set(STORE_KEY, data);
        }

    }
}
