/**
 * DataSource for server public key.
 */
// MODULE'S VARS
const ATTEMPTS = 4; // number of attempts to get response event from backend
const TIMEOUT = 2000; // between events messages to backend

// MODULE'S CLASSES
export default class TeqFw_User_Front_DSource_Server_Key {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_User_Front_Defaults} */
        const DEF = spec['TeqFw_User_Front_Defaults$'];
        /** @type {TeqFw_Web_Front_Store} */
        const store = spec['TeqFw_Web_Front_Store$'];
        /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
        const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {TeqFw_User_Shared_Event_Front_Server_Key_Request} */
        const esfKeyReq = spec['TeqFw_User_Shared_Event_Front_Server_Key_Request$'];
        /** @type {TeqFw_User_Shared_Event_Back_Server_Key_Response} */
        const esbKeyRes = spec['TeqFw_User_Shared_Event_Back_Server_Key_Response$'];

        // ENCLOSED VARS
        const STORE_KEY = `${DEF.SHARED.NAME}/back/server/key`;
        let _cache;

        // INSTANCE METHODS
        this.get = async () => {
            // ENCLOSED FUNCTIONS
            function loadServerKey() {
                return new Promise((resolve) => {
                    const msg = esfKeyReq.createDto();
                    portalBack.publish(msg); // send first message
                    let i = 0;
                    const intId = setInterval(() => {
                        portalBack.publish(msg);
                        if (i++ > ATTEMPTS) {
                            clearInterval(intId);
                            resolve(null);
                        }
                    }, TIMEOUT);
                    eventsFront.subscribe(
                        esbKeyRes.getEventName(),
                        /**
                         * @param {TeqFw_User_Shared_Event_Back_Server_Key_Response.Dto} data
                         */
                        ({data}) => {
                            if (intId) clearInterval(intId);
                            resolve(data.publicKey);
                        }
                    );
                });

            }

            // MAIN
            if (!_cache) {
                _cache = await store.get(STORE_KEY);
                if (!_cache) {
                    _cache = await loadServerKey();
                    await store.set(STORE_KEY, _cache);
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
