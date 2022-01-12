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
        /** @type {TeqFw_User_Shared_Dto_AsymKeys} */
        const dtoKeys = spec['TeqFw_User_Shared_Dto_AsymKeys$'];

        this.generateAsyncKeys = async function () {
            const res = dtoKeys.createDto();
            const keysBuf = nacl.box.keyPair();
            res.secret = util.encodeBase64(keysBuf.secretKey);
            res.public = util.encodeBase64(keysBuf.publicKey);
            return res;
        }

        this.generateSecretKey = async function () {
            return util.encodeBase64(nacl.randomBytes(nacl.secretbox.keyLength));
        }
    }
}
