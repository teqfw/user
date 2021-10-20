import assert from 'assert';
import {container, cfg as cfgTest, dbConnect} from '../../../../../TestEnv.mjs';
import {describe, it} from 'mocha';
import {join} from 'path';
import {existsSync} from 'fs';
import {Meta as MComplex} from './Complex.mjs';

const pathData = join(cfgTest.path.test, 'data/man/ds001');
const pathDem = join(pathData, 'dem.json');
const pathMap = join(pathData, 'map.json');

// mock dependencies
// const regPlugins = {
//     getMapPath2Name() {
//         return {
//             [pathData]: 'app'
//         }
//     }
// };
// container.set('TeqFw_Core_Back_Scan_Plugin_Registry$', regPlugins);

// get object from container and run tests
/** @type {TeqFw_Db_Back_Dem_Load} */
const load = await container.get('TeqFw_Db_Back_Dem_Load$');


/** @type {TeqFw_Db_Back_Dem_Load_A_Scan_A_Dem} */
const loadDem = await container.get('TeqFw_Db_Back_Dem_Load_A_Scan_A_Dem$');
/** @type {TeqFw_Db_Back_Dem_Load_A_Scan_A_Map} */
const loadMap = await container.get('TeqFw_Db_Back_Dem_Load_A_Scan_A_Map$');
/** @type {TeqFw_Db_Back_Dem_Load_A_Norm} */
const norm = await container.get('TeqFw_Db_Back_Dem_Load_A_Norm$');
/** @type {TeqFw_Db_Back_Dem_Load_A_SchemaCfg} */
const schemaCfg = await container.get('TeqFw_Db_Back_Dem_Load_A_SchemaCfg$');

/** @type {TeqFw_User_Back_Store_RDb_Schema_User.Meta} */
const mUser = await container.get('TeqFw_User_Back_Store_RDb_Schema_User#Meta$');
const mComplex = new MComplex({'TeqFw_User_Back_Defaults$': {SHARED: {NAME: 'app'}}});
// main object
/** @type {TeqFw_User_Back_Store_RDb_Dao_User} */
const obj = await container.get('TeqFw_User_Back_Store_RDb_Dao_User$');

const demApp = await loadDem.exec({filename: pathDem});
const map = await loadMap.exec({filename: pathMap});
const dems = {app: demApp};
const {dem} = await norm.exec({dems, map});
const {cfg} = await schemaCfg.exec({map});

describe('TeqFw_User_Back_Store_RDb_Dao_User', function () {


    it('there is app root folder', async () => {
        assert(existsSync(pathData));
    });

    it('can drop/create tables', async () => {
        /** @type {TeqFw_Db_Back_RDb_Schema} */
        const obj = await container.get('TeqFw_Db_Back_RDb_Schema$');
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = await dbConnect();
        obj.setDem({dem});
        obj.setCfg({cfg});
        await obj.dropAllTables({conn});
        await obj.createAllTables({conn});
        await conn.disconnect();
    });

    it('can create instance', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        /** @type {TeqFw_Db_Back_RDb_CrudEngine} */
        const crud = await container.get('TeqFw_Db_Back_RDb_CrudEngine$');
        const trx = await conn.startTransaction();
        try {
            const data = {'not_exist': 4};
            const pk = await crud.create(data, mUser, trx);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
        }
        await conn.disconnect();
    });

    it('can create complex instance', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        /** @type {TeqFw_Db_Back_RDb_CrudEngine} */
        const crud = await container.get('TeqFw_Db_Back_RDb_CrudEngine$');
        const trx = await conn.startTransaction();
        try {
            const data = {'key_str': 'str', 'key_num': 6};
            const pk = await crud.create(data, mComplex, trx);
            await trx.commit();
        } catch (e) {
            await trx.rollback();
        }
        await conn.disconnect();
    });

});

