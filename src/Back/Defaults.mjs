/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_User_Back_Defaults {

    CLI_PREFIX = 'user'; // prefix in CLI commands

    /** @type {TeqFw_User_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        // EXTRACT DEPS
        this.SHARED = spec['TeqFw_User_Shared_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
