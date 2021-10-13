import container from '../../../../DevEnv.mjs';
import User from '@flancer32/teq_user/src/Back/Store/RDb/Schema/User.mjs'; // init development environment
// get database connector then execute the process
/** @type {TeqFw_Db_Back_RDb_IConnect} */
const rdb = await container.get('TeqFw_Db_Back_RDb_IConnect$');
/** @type {TeqFw_User_Back_Store_RDb_Dao_User} */
const daoUser = await container.get('TeqFw_User_Back_Store_RDb_Dao_User$');
/** @type {typeof TeqFw_User_Back_Store_RDb_Schema_User} */
const EUser = await container.get('TeqFw_User_Back_Store_RDb_Schema_User#');
/** @type {TeqFw_Db_Back_RDb_QueryBuilder} */
const queryBuilder = await container.get('TeqFw_Db_Back_RDb_QueryBuilder$');

// don't start transaction if not required
const trx = await rdb.startTransaction();
try {
    const data = new EUser();
    data.id = 305;
    data.date_created = new Date();
    const query = queryBuilder.queryInsert(trx);
    const id = await daoUser.create(trx, data);
    await trx.commit();
} catch (error) {
    await trx.rollback();
    throw error;
}
rdb.disconnect();
debugger
