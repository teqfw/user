/**
 * Initialize test environment to run unit or modules tests.
 * @namespace TestEnv
 * @deprecated use @teqfw/test
 */
import {dirname, join} from 'path';
import {existsSync} from 'fs';
import Container from '@teqfw/di';

/**
 * @typedef {Object} TestEnv.Config.Path
 * @memberOf TestEnv.Config
 * @property {string} root path to the root folder of the plugin
 * @property {string} src path to the own sources of the plugin
 * @property {string} test path to the root folder of the tests for the plugin
 */

/**
 * @typedef {Object} TestEnv.Config
 * @property {TestEnv.Config.Path} path paths to various parts of the plugin files
 */

/**
 * Compose configuration object for test env.
 * @type {TestEnv.Config}
 */
const cfg = (function () {
    /* Resolve paths to main folders */
    const url = new URL(import.meta.url);
    const currentScript = url.pathname;
    const pathScript = dirname(currentScript);
    const pathPrj = join(pathScript, '..');
    const pathTest = join(pathPrj, 'test');
    const srcOwn = join(pathPrj, 'src');
    return {
        path: {
            root: pathPrj,
            src: srcOwn,
            test: pathTest,
        }
    };
})();

/**
 * Create and setup DI container (once per all imports).
 * @type {TeqFw_Di_Shared_Container}
 */
const container = (function (cfg) {
    /** @type {TeqFw_Di_Shared_Container} */
    const res = new Container();
    const pathNodeInt = join(cfg.path.root, 'node_modules');
    const pathNodeExt = join(cfg.path.root, '../../../node_modules');
    const pathNode = existsSync(pathNodeInt) ? pathNodeInt : pathNodeExt;
    const srcTeqFwDi = join(pathNode, '@teqfw/di/src');
    const srcTeqFwCore = join(pathNode, '@teqfw/core/src');
    const srcTeqFwDb = join(pathNode, '@teqfw/db/src');
    // add backend sources to map
    res.addSourceMapping('TeqFw_User', cfg.path.src, true, 'mjs');
    res.addSourceMapping('TeqFw_Db', srcTeqFwDb, true, 'mjs');
    res.addSourceMapping('TeqFw_Core', srcTeqFwCore, true, 'mjs');
    res.addSourceMapping('TeqFw_Di', srcTeqFwDi, true, 'mjs');
    return res;
})(cfg);

/**
 * Load local config.
 * @typedef {Object}
 */
const localCfg = await (async function (cfg, container) {
    // DEFINE INNER FUNCTIONS
    /**
     * Default connection parameters to PostgreSQL/MariaDB/MuSQL database.
     * Override these params in local configuration (test/data/cfg/local.json).
     *
     * @return {Object}
     */
    function generateDefault() {
        const connection = {
            "database": "teqfw_db_test",
            "host": "127.0.0.1",
            "password": "PasswordToConnectToTeqFWDb",
            "user": "teqfw"
        };
        return {
            mariadb: {client: "mysql2", connection},
            pg: {client: "pg", connection}
        };
    }

    // MAIN FUNCTIONALITY
    /** @type {TeqFw_Db_Back_Defaults} */
    const DEF = await container.get('TeqFw_Db_Back_Defaults$');
    /** @type {TeqFw_Core_Back_Config} */
    const config = await container.get('TeqFw_Core_Back_Config$');
    const pathData = join(cfg.path.test, 'data');
    config.loadLocal(pathData);
    const local = config.getLocal();
    return local[DEF.NAME] ?? generateDefault();
})(cfg, container);

/**
 * Use this function in tests to init DB connections.
 *
 * @return {Promise<TeqFw_Db_Back_RDb_Connect>}
 */
const dbConnect = async function () {
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    const conn = await container.get('TeqFw_Db_Back_RDb_Connect$$'); // instance
    await conn.init(localCfg.mariadb);
    // await conn.init(localCfg.pg);
    return conn;
}


/**
 * Setup development environment (if not set before) and return DI container.
 *
 * @returns {Promise<TeqFw_Di_Shared_Container>}
 */
export default async function () {
    return container;
}

export {
    cfg,
    container,
    dbConnect
};
