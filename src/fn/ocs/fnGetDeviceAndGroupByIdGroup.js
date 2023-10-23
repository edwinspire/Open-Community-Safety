import { device } from "../../lib/ocs/database/models/devices.js";
import { telegram_groups_devices } from "../../lib/ocs/database/models/telegram_groups_devices.js";

export default async  (
    /** @type {any} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: import("sequelize").Model<any, any>[]): void; new (): any; }; }; }} */ res,
    /** @type {any} */ data
  ) => {
    try {
      let datar = await device.findAll({
        include: [
          {
            model: telegram_groups_devices,
            required: true, // Cambia a false si deseas un LEFT JOIN en lugar de un INNER JOIN
            where: {
              idtg: data.id_group, // Filtra por el valor deseado de idevice_id
            },
          },
        ],
        raw: true,
      });
  
      console.log("----> fn_getDeviceAndGroup", datar);
  
      res.status(200).json(datar);
    } catch (error) {
      console.trace(error);
      // @ts-ignore
      res.status(500).json({ error: error.message });
    }
  };
  