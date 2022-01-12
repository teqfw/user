/**
 * DataSource for user keys for asymmetric encryption.
 * This object generates keys if they are not found in IDB.
 * @deprecated use TeqFw_User_Front_DSource_User
 */
export default class TeqFw_User_Front_DSource_User_Keys {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_User_Front_Defaults} */
        const DEF = spec['TeqFw_User_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Store} */
        const store = spec['TeqFw_Web_Front_Store$'];
        /** @type {TeqFw_User_Shared_Api_Crypto_Key_IManager} */
        const mgrKeys = spec['TeqFw_User_Shared_Api_Crypto_Key_IManager$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/user/keys`;
        let _cache;

        // INSTANCE METHODS
        this.get = async () => {
            if (!_cache) {
                // get from IDB
                _cache = await store.get(STORE_KEY);
                // generate keys and save to IDB
                if (!_cache) {
                    const keys = await mgrKeys.generateAsyncKeys();
                    await this.set(keys);
                }
            }
            return _cache;
        }

        this.set = async (data) => {
            _cache = data;
            await store.set(STORE_KEY, data);
        }

    }
}
