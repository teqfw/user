/**
 * Key manager to generate keys, import/export keys, etc.
 * @namespace TeqFw_User_Front_Mod_Crypto_Key_Manager
 */

/**
 * @implements TeqFw_User_Shared_Api_Crypto_Key_IManager
 */
export default class TeqFw_User_Front_Mod_Crypto_Key_Manager {
    constructor(spec) {
        // EXTRACT DEPS
        const {box, secretbox, randomBytes} = spec['TeqFw_User_Front_Lib_Nacl'];
        const {decodeBase64, encodeBase64} = spec['TeqFw_User_Front_Lib_Nacl_Util'];

        // DEFINE INSTANCE METHODS

        this.generateAsyncKeys = async function () {
            const keysBuf = box.keyPair();
            const secretKey = encodeBase64(keysBuf.secretKey);
            const publicKey = encodeBase64(keysBuf.publicKey);
            return {secretKey, publicKey};
        }

        this.generateSecretKey = async function () {
            return encodeBase64(randomBytes(secretbox.keyLength));
        }
    }
}
