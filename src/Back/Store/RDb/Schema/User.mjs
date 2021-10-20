/**
 *  'user' entity (registry)
 */
export default class TeqFw_User_Back_Store_RDb_Schema_User {
    date_created;
    id;
}

const ENTITY = '/user';
/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    ID: 'id'
};

// table name and columns names (entity and attributes) to use in queries to RDb
TeqFw_User_Back_Store_RDb_Schema_User.A_DATE_CREATED = 'date_created';
TeqFw_User_Back_Store_RDb_Schema_User.A_ID = 'id';
TeqFw_User_Back_Store_RDb_Schema_User.ENTITY = 'user';

/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export class Meta {

    constructor(spec) {
        /** @type {TeqFw_User_Back_Defaults} */
        const DEF = spec['TeqFw_User_Back_Defaults$'];
        this.getEntityName = function () {
            return `${DEF.SHARED.NAME}${ENTITY}`;
        }

        this.getAttributes = function () {
            return Object.keys(ATTR);
        }

        this.getPrimaryKey = function () {
            return [ATTR.ID];
        }
    }

}


// finalize code components for this es6-module
Object.freeze(TeqFw_User_Back_Store_RDb_Schema_User);
Object.freeze(ATTR);
