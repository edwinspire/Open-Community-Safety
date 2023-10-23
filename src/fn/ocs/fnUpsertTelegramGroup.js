import { telegram_groups } from "../../lib/ocs/database/models/telegram_groups.js";

export default async (
    /** @type {any} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: import("sequelize").Model<any, any>[]): void; new (): any; }; }; }} */ res,
    /** @type {any} */ data
) => {

console.log('Data que llega: ', data);
    try {
        let [app] = await telegram_groups.upsert(data);
        res.status(200).json(app.dataValues);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }

};

