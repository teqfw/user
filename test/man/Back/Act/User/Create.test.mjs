/**
 * Create new user in RDB.
 */
import assert from 'assert';
import {config, container, dbConnect, RDBMS} from '@teqfw/test';
import {describe, it} from 'mocha';
import {loadRoot} from '../../../lib/util.mjs';

const path = config.pathToRoot;


// get runtime objects from DI
/** @type {TeqFw_User_Back_Act_User_Create.act|function} */
const act = await container.get('TeqFw_User_Back_Act_User_Create$');


// prepare this unit runtime objects
// const path = cfgTest.path.root;
const {dem, cfg} = await loadRoot(container, path);


describe('TeqFw_User_Back_Act_User_Create', function () {

    it('can create user', async () => {
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = await dbConnect(RDBMS.MARIADB);
        conn.setSchemaConfig(cfg);
        try {
            const trx = await conn.startTransaction();
            const res = await act({trx, keyPub: 'key'});
            await trx.commit();
            assert(typeof res.userId === 'number');
        } finally {
            await conn.disconnect();
        }

    });


});

