/**
 * Registry to map authenticated users to event streams.
 *
 * @namespace TeqFw_User_Back_Mod_Event_Stream_Registry
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'TeqFw_User_Back_Mod_Event_Stream_Registry';

// MODULE'S CLASSES
export default class TeqFw_User_Back_Mod_Event_Stream_Registry {
    constructor(spec) {
        // EXTRACT DEPS

        // ENCLOSED VARS
        /**
         * Map user ids to streams UUIDs (one user can have one and more connections - mobile and notebook, for example).
         * @type {Object<number, string[]>}
         */
        const _store = {};
        /**
         * Map stream UUID to user id.
         * @type {Object<string, number>}
         */
        const _mapStreamToUser = {};

        // MAIN

        // ENCLOSED FUNCTIONS

        // INSTANCE METHODS
        this.add = function (userId, streamUUID) {
            if (!_store[userId]) _store[userId] = [];
            _store[userId].push(streamUUID);
            _mapStreamToUser[streamUUID] = userId;
        }

        /**
         * Delete closed event stream from the registry.
         * @param {string} streamUUID
         */
        this.deleteStream = function (streamUUID) {
            const userId = _mapStreamToUser[streamUUID];
            if (userId) {
                _store[userId] = _store[userId].filter((one) => one !== streamUUID);
                delete _mapStreamToUser[streamUUID];
                if (_store[userId].length === 0) delete _store[userId];
            }
        }

        /**
         * Get event streams by user id.
         * @param userId
         * @return {string[]}
         */
        this.getStreams = function (userId) {
            return _store[userId];
        }
    }
}
