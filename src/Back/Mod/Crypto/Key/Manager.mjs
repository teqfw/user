/**
 * Backend implementation of crypto key manager.
 * @namespace TeqFw_User_Back_Mod_Crypto_Key_Manager
 */
// MODULE'S IMPORT
import nacl from 'tweetnacl'; // as CommonJS module
import util from 'tweetnacl-util'; // as CommonJS module

/**
 * @implements TeqFw_User_Shared_Api_Crypto_Key_IManager
 */
export default class TeqFw_User_Back_Mod_Crypto_Key_Manager {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_User_Back_Defaults} */
        const DEF = spec['TeqFw_User_Back_Defaults$'];

        this.generateAsyncKeys = async function () {
            const keysBuf = nacl.box.keyPair();
            const secretKey = util.encodeBase64(keysBuf.secretKey);
            const publicKey = util.encodeBase64(keysBuf.publicKey);
            return {secretKey, publicKey};
        }
        /**
         * Generate key for synchronous encryption.
         * @return {Promise<string>} base64 encoded key.
         */
        this.generateSecretKey = async function () {
            throw  new Error('Is not implemented yet.');
        }
    }
}
