/**
 * Wrapper for 'tweetnacl-util' npm-package (commonJS).
 *
 * Statics mapping for web server see in './teqfw.json'.
 * All frontend imports are related to this es6-module.
 *
 * @namespace TeqFw_User_Front_Lib_Nacl_Util
 */
// MODULE'S IMPORT
import * as unused from '../../../../tweetnacl-util/nacl-util.min.js'; // just load CommonJS module to browser

// MODULE'S MAIN
// re-export imported stuff from 'window' object
export const {
    decodeBase64,
    decodeUTF8,
    encodeBase64,
    encodeUTF8,
} = window.nacl.util;
