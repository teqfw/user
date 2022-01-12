/**
 * Create new user in RDB.
 */
import assert from 'assert';
import {container, cfg as cfgTest, dbConnect} from '../../../../TestEnv.mjs';
import {describe, it} from 'mocha';
import {loadRoot} from '../../../lib/util.mjs';


// get runtime objects from DI
/** @type {TeqFw_User_Back_Act_User_Create.act|function} */
const act = await container.get('TeqFw_User_Back_Act_User_Create$');


// prepare this unit runtime objects
const path = cfgTest.path.root;
const {dem, cfg} = await loadRoot(container, path);


describe('TeqFw_User_Back_Act_User_Create', function () {

    it('can create user', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect();
        conn.setSchemaConfig(cfg);
        const trx = await conn.startTransaction();
        const res = await act({trx, keyPub: 'key'});
        await trx.commit();
        await conn.disconnect();
    });


});

