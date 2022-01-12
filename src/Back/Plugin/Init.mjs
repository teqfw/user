/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];

    // ENCLOSED FUNCTIONS
    async function action() {
        // run initialization synchronously to prevent doubling of singletons
        await container.get('TeqFw_User_Back_Proc_Authenticate$');
        await container.get('TeqFw_User_Back_Proc_Server_Key_Source$');
        /** @type {TeqFw_User_Back_Act_User_Create.act|function} */
        const act = await container.get('TeqFw_User_Back_Act_User_Create$');
        debugger
    }

    // MAIN
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
