import { upsertDevice } from "../../ocs/database/api/device.js";

export const fn_upsertDevice = async (
    /** @type {any} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: import("sequelize").Model<any, any>[]): void; new (): any; }; }; }} */ res, /** @type {any} */ data
) => {

    try {
        let d = await upsertDevice(data);
        // @ts-ignore
        res.status(200).json(d);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }

}
