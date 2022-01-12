/**
 * Interface for cryptographic keys manager.
 *
 * There are different cryptographic libraries and algorithms, so this interface defines
 * base principles for crypto keys usage in the app (both for back & front).
 *
 * @namespace TeqFw_User_Shared_Api_Crypto_Key_IManager
 */

/**
 * Interface for cryptographic keys manager.
 *
 * @interface
 */
export default class TeqFw_User_Shared_Api_Crypto_Key_IManager {

    /**
     * Generate keys pair for asynchronous encryption.
     * Both keys in result  are base64 encoded strings.
     * @return {Promise<{secretKey: string, publicKey: string}>}
     */
    async generateAsyncKeys() {
        return {
            secretKey: '',
            publicKey: ''
        };
    }

    /**
     * Generate key for synchronous encryption.
     * @return {Promise<string>} base64 encoded key.
     */
    async generateSecretKey() {
        return '';
    }

}
