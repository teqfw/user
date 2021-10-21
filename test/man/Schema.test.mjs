/**
 * Drop/create DB schema for manual tests.
 */
import assert from 'assert';
import {container, cfg as cfgTest, dbConnect} from '../TestEnv.mjs';
import {describe, it} from 'mocha';
import {loadRoot} from './lib/util.mjs';


// get runtime objects from DI
/** @type {TeqFw_Db_Back_RDb_Schema} */
const schema = await container.get('TeqFw_Db_Back_RDb_Schema$');


// prepare this unit runtime objects
const path = cfgTest.path.root;
const {dem, cfg} = await loadRoot(container, path);


describe('RDB schema for manual tests:', function () {

    it('can drop all tables', async () => {
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = await dbConnect();
        schema.setDem({dem});
        schema.setCfg({cfg});
        await schema.dropAllTables({conn});
        await conn.disconnect();
    });

    it('can create all tables', async () => {
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const conn = await dbConnect();
        schema.setDem({dem});
        schema.setCfg({cfg});
        await schema.createAllTables({conn});
        await conn.disconnect();
    });

});

