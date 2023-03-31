/**
 * Registry new user in RDB.
 *
 * @namespace TeqFw_User_Back_Act_User_Create
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Act_User_Create';

// MODULE'S FUNCTIONS
export default function (spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_Api_RDb_CrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_CrudEngine$'];
    /** @type {TeqFw_User_Back_Store_RDb_Schema_User} */
    const meta = spec['TeqFw_User_Back_Store_RDb_Schema_User$'];

    // ENCLOSED VARS
    /** @type {typeof TeqFw_User_Back_Store_RDb_Schema_User.ATTR} */
    const ATTR = meta.getAttributes();

    // ENCLOSED FUNCTIONS
    /**
     * @param {TeqFw_Db_Back_RDb_ITrans} trx
     * @param {string} keyPub
     * @return {Promise<{userId}>}
     * @memberOf TeqFw_User_Back_Act_User_Create
     */
    async function act({trx, keyPub}) {
        const data = {
            [ATTR.KEY_PUB]: keyPub,
            [ATTR.DATE_CREATED]: new Date(),
        };
        const pk = await crud.create(trx, meta, data);
        const userId = pk[ATTR.ID];
        return {userId};
    }

    // MAIN
    Object.defineProperty(act, 'namespace', {value: NS});
    return act;
}
