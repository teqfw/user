/**
 * DataSource for user data stored in IDB.
 */
export default class TeqFw_User_Front_DSource_User {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_User_Front_Defaults} */
        const DEF = spec['TeqFw_User_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Store} */
        const store = spec['TeqFw_Web_Front_Store$'];
        /** @type {TeqFw_User_Shared_Dto_User} */
        const dtoUser = spec['TeqFw_User_Shared_Dto_User$'];
        /** @type {TeqFw_User_Shared_Api_Crypto_Key_IManager} */
        const mgrKeys = spec['TeqFw_User_Shared_Api_Crypto_Key_IManager$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/front/user`;
        let _cache;

        // INSTANCE METHODS
        /**
         * Get user data from IDB or generate new one and sae to IDB.
         * @return {Promise<TeqFw_User_Shared_Dto_User.Dto>}
         */
        this.get = async () => {
            if (!_cache) {
                // get from IDB
                _cache = await store.get(STORE_KEY);
                // create new DTO, generate keys and save to IDB
                if (!_cache) {
                    const user = dtoUser.createDto();
                    user.keys = await mgrKeys.generateAsyncKeys();
                    await this.set(user);
                }
            }
            return _cache;
        }

        /**
         * @param {TeqFw_User_Shared_Dto_User.Dto} data
         * @return {Promise<void>}
         */
        this.set = async (data) => {
            _cache = data;
            await store.set(STORE_KEY, data);
        }

    }
}
