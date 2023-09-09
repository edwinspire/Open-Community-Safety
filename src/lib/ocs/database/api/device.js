import { device } from "../models/devices.js";
//"../ $lib/ocs/database/models/devices.js";

// UPSERT
export const upsertDevice = async (
	/** @type {import("sequelize").Optional<any, string>} */ appData,
	/** @type {undefined} */ transaction
) => {
    try {
        let [app, create] = await device.upsert(appData, transaction);

        //console.log('XXXX>>> [app, create] ', app, create);

        let data = app.dataValues;

        return data;
    } catch (error) {
        console.error('Error performing UPSERT on app:', error);
        throw error;
    }
};
