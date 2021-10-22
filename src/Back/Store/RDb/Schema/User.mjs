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
    ID: 'id'
};
const ATTRIBUTES = Object.values(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 */
class Dto {
    date_created;
    id;
}

/**
 * @memberOf TeqFw_User_Back_Store_RDb_Schema_User
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
class Meta {

    constructor(spec) {
        /** @type {TeqFw_User_Back_Defaults} */
        const DEF = spec['TeqFw_User_Back_Defaults$'];

        this.createDto = (data) => {
            const res = new Dto();
            for (const attr of Object.keys(data))
                if (ATTRIBUTES.includes(attr)) res[attr] = data[attr];
            return res;
        }

        this.getEntityName = () => `${DEF.SHARED.NAME}${ENTITY}`;

        this.getAttributes = () => Object.values(ATTR);

        this.getPrimaryKey = () => [ATTR.ID];

        this.ATTR = ATTR;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Dto, 'name', {value: `${NS}.${Dto.name}`});
Object.freeze(ATTR);
export {Dto, Meta};
