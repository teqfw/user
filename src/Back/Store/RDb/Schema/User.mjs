/**
 *  'user' entity (registry)
 */
export default class TeqFw_User_Back_Store_RDb_Schema_User {
    date_created;
    id;
}

// table name and columns names (entity and attributes) to use in queries to RDb
TeqFw_User_Back_Store_RDb_Schema_User.A_DATE_CREATED = 'date_created';
TeqFw_User_Back_Store_RDb_Schema_User.A_ID = 'id';
TeqFw_User_Back_Store_RDb_Schema_User.ENTITY = 'user';

// finalize code components for this es6-module
Object.freeze(TeqFw_User_Back_Store_RDb_Schema_User);
