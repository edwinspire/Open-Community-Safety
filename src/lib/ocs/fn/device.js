import { upsertDevice } from "../../ocs/database/api/device.js";
import { v4 as uuidv4 } from "uuid";
import uF from "@edwinspire/universal-fetch";
import { local_host_root, app_name } from "../../ocs/utils.js";
//"./lib/ocs/utils.js";

const { OCS_URL_WS_DEVICE, OCS_URL_ADMIN_DEVICE } = process.env;

export const fn_upsertDevice = async (
  /** @type {any} */ req,
  /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: import("sequelize").Model<any, any>[]): void; new (): any; }; }; }} */ res,
  /** @type {any} */ data
) => {
  try {
    let d = await upsertDevice(data);
    // @ts-ignore
    res.status(200).json(d);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};

/**
 * @param {{ data: any; req: any; deviceId: string; }} data
 * @param {{ ws: { send: (arg0: string) => void; APIServer: { authorization: { username: any; password: any; }; }; }; }} e
 * @param {any[]} clients
 */
export async function processRequest(data, e, clients) {
  const uFetch = new uF();

  let data_values = data.data;

  //console.log(">>>>> data_values", data_values);

  switch (data.req) {
    case 1000:
      // Registra dispositivo
      if (data.deviceId == "00a0aa00-aa00-0000-0000-000000000000") {
        // Si tiene el valor por default se le envía uno nuevo
        console.log("Default id -  se devuelve un nuevo id");

        e.ws.send(JSON.stringify({ cmd: 1000, deviceId: uuidv4() }));
      } else if (data_values && data_values.deviceId) {
        // Tiene ya un id asignado, se registra el dispositivo
        console.log("Registrar dispositivo", e.ws);

        uFetch.setBasicAuthorization(
          e.ws.APIServer.authorization.username,
          e.ws.APIServer.authorization.password
        );

        let respF = await uFetch.post(local_host_root(OCS_URL_ADMIN_DEVICE), {
          device_id: data_values.deviceId,
          name: data_values.name,
          last_connection: Date.now(),
          chip: data_values.chip,
          chip_model: data_values.chip_model,
          chip_version: data_values.chip_version,
          latitude: data_values.lat,
          longitude: data_values.lon,
          allow_activation_by_geolocation: data_values.acbgl,
        });

        clients.forEach((c) => {
          if (c.ocs) {
            c.ocs.deviceId = data_values.deviceId;
          } else {
            c.ocs = { deviceId: data_values.deviceId };
          }
          //  console.log('>>> forEach ' , c.ocs);
        });

        console.log(await respF.json());
      }
      break;

    default:
      console.log("No es mil", data.req);
      break;
  }
}

/**
 * @param {{ cmd: any; deviceId: any; req: any; }} data
 * @param {any} e
 * @param {any} clients
 */
export async function processCMD(data, e, clients) {
  const uFetch = new uF();

  //console.log(e.ws);

  clients.forEach(
    (
      /** @type {{ ocs: { deviceId: any; }; send: (arg0: string) => void; }} */ c
    ) => {
      //  console.log(">>>>>>>>>>>>>>>->>>>>>>>>> forEach", c);

      switch (data.cmd) {
        case 1: // Trigger alarm
          if (data.deviceId) {
            console.log("CMD", data.deviceId);

            if (c.ocs && data.deviceId == c.ocs.deviceId) {
              //  console.log(">> Se envia el comando al dispositivo");
              c.send(JSON.stringify({ cmd: data.cmd }));
              break;
            }
          } else {
            // Aqui obtener la lista de dispositivos que pertenecen al grupo para enviar el comando
            console.log("Se debe enviar el comando a todos los dispositivos");
          }

          break;

        default:
          console.log("No es mil", data.req);
          break;
      }
    }
  );
}
