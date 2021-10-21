/**
 * Library with functions to help with manual tests.
 */

import {join} from 'path';

const DEF = {
    cfgPrefix: 'tup', // test user plugin
};

/**
 * This function has classic input interface (low variability is expected) and compositional output.
 *
 * @param {TeqFw_Di_Shared_Container} container
 * @param {string} pathData
 * @return {Promise<{cfg: TeqFw_Db_Back_Dto_Config_Schema, dem: TeqFw_Db_Back_Dto_Dem}>}
 */
async function load(container, pathData) {
    /** @type {TeqFw_Db_Back_Dem_Load_A_Scan_A_Dem} */
    const loadDem = await container.get('TeqFw_Db_Back_Dem_Load_A_Scan_A_Dem$');
    /** @type {TeqFw_Db_Back_Dem_Load_A_Scan_A_Map} */
    const loadMap = await container.get('TeqFw_Db_Back_Dem_Load_A_Scan_A_Map$');
    /** @type {TeqFw_Db_Back_Dem_Load_A_Norm} */
    const norm = await container.get('TeqFw_Db_Back_Dem_Load_A_Norm$');
    /** @type {TeqFw_Db_Back_Dem_Load_A_SchemaCfg} */
    const schemaCfg = await container.get('TeqFw_Db_Back_Dem_Load_A_SchemaCfg$');

    // prepare this unit runtime objects
    const pathDem = join(pathData, 'dem.json');
    const pathMap = join(pathData, 'map.json');
    const demApp = await loadDem.exec({filename: pathDem});
    const map = await loadMap.exec({filename: pathMap});
    const dems = {app: demApp};
    const {dem} = await norm.exec({dems, map});
    const {cfg} = await schemaCfg.exec({map});
    return {dem, cfg};
}

/**
 * Load DEM from the root of the current plugin. Scan for teq-plugins in 'node_modules'.
 *
 * This function has classic input interface (low variability is expected) and compositional output.
 *
 * @param {TeqFw_Di_Shared_Container} container
 * @param {string} path to folder with './node_modules' inside.
 * @return {Promise<{cfg: TeqFw_Db_Back_Dto_Config_Schema, dem: TeqFw_Db_Back_Dto_Dem}>}
 */
async function loadRoot(container, path) {
    /** @type {TeqFw_Core_Back_Scan_Plugin} */
    const pluginScan = await container.get('TeqFw_Core_Back_Scan_Plugin$');
    /** @type {TeqFw_Db_Back_Dem_Load} */
    const demLoad = await container.get('TeqFw_Db_Back_Dem_Load$');

    // prepare this unit runtime objects
    await pluginScan.exec(path); // scan for teq-plugins' names
    const {dem, cfg} = await demLoad.exec({path}); // scan for DEMs (map is omitted in results)
    cfg.prefix = DEF.cfgPrefix;
    return {dem, cfg};
}

export {
    load,
    loadRoot
};
