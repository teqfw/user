export default class TeqFw_User_Back_Store_RDb_Dao_User {
    constructor(spec) {
        /** @type {typeof TeqFw_User_Back_Store_RDb_Schema_User} */
        const Entity = spec['TeqFw_User_Back_Store_RDb_Schema_User#'];

        /**
         * Create new instance of the entity.
         * @param trx
         * @param data
         */
        this.create = async function (trx, data) {
            const payload = {};
            for (const key of Object.keys(Entity)) {
                const pref = key.substr(0, 2);
                if (key.substr(0, 2) === 'A_') {
                    const attr = Entity[key];
                    if (data[attr] !== undefined) {
                        payload[attr] = data[attr];
                    }
                }
            }
            const query = trx(Entity.ENTITY)
                .insert(payload);
            const rs = await query;
            const [result] = rs;
            return result;
        }
    }

}
