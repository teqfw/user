/**
 *  Meta data for '/user' entity (users registry).
 *  @namespace TeqFw_User_Back_Store_RDb_Schema_User
 */
// MODULE'S VARS
const NS = 'TeqFw_User_Back_Store_RDb_Schema_User';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/user';

/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    ID: 'id',
    KEY_PUB: 'key_pub',
    USERNAME: 'username',
};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 */
class Dto {
    static namespace = `${NS}.Dto`;
    /** @type {Date} */
    date_created;
    /** @type {number} */
    id;
    /** @type {string} */
    key_pub;
    /** @type {string} */
    username;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class TeqFw_User_Back_Store_RDb_Schema_User {
    constructor(spec) {
        /** @type {TeqFw_Web_Push_Back_Defaults} */
        const DEF = spec['TeqFw_Web_Push_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }

    /**
     * For JSDoc declarations only.
     * @param [data]
     * @return {TeqFw_User_Back_Store_RDb_Schema_User.Dto}
     */
    createDto(data) {}
}

// finalize code components for this es6-module
Object.freeze(ATTR);
