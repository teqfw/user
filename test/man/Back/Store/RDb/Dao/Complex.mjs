const ENTITY = '/complex/pkey';

const ATTR = {
    KEY_NUM: 'key_num',
    KEY_STR: 'key_str'
};

/**
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
            return Object.values(ATTR);
        }

        this.getPrimaryKey = function () {
            return [ATTR.KEY_NUM, ATTR.KEY_STR];
        }
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
