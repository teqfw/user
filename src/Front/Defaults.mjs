/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_User_Front_Defaults {

    /** @type {TeqFw_User_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.SHARED = spec['TeqFw_User_Shared_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
