import { upsertDevice } from "../../ocs/database/api/device.js";
import { device } from "../../ocs/database/models/devices.js";
import { telegram_groups_devices } from "../../ocs/database/models/telegram_groups_devices.js";

import { v4 as uuidv4 } from "uuid";
import uF from "@edwinspire/universal-fetch";
import { local_host_root, fetchOCSGet, fetchOCSPost, CommunicationCommandFromNumberExists, CommunicationCommand } from "../../ocs/utils.js";
//"./lib/ocs/utils.js";

const { OCS_URL_ADMIN_DEVICE } = process.env;

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
 * @param {{ device_id: string; name: any; chip: any; chip_model: any; chip_version: any; }} data
 * @param {{ send: any; APIServer: any; ocs?: any; }} ws
 */
async function RegisterDevice(data, ws) {

  // Registra dispositivo
  if (data.device_id == "00a0aa00-aa00-0000-0000-000000000000") {
    // Si tiene el valor por default se le envía uno nuevo
    console.log("Default id -  se devuelve un nuevo id");
    sendCommandWebsocket(CommunicationCommand.SET_DEVICE_ID, { device_id: uuidv4() }, ws);
    // ws.send(JSON.stringify({ cmd: CommunicationCommand.SET_DEVICE_ID, device_id: uuidv4() }));
  } else if (data && data.device_id) {
    try {
      // Tiene ya un id asignado, se registra el dispositivo
      console.log("Registrar dispositivo", data);
      const uFetch = new uF();

      uFetch.setBasicAuthorization(
        ws.APIServer.authorization.username,
        ws.APIServer.authorization.password
      );

      let respF = await fetchOCSPost(OCS_URL_ADMIN_DEVICE, {
        device_id: data.device_id,
        name: data.name,
        last_connection: Date.now(),
        chip: data.chip,
        chip_model: data.chip_model,
        chip_version: data.chip_version,
        //         latitude: data_values.lat,
        //         longitude: data_values.lon,
        //         allow_activation_by_geolocation: data_values.acbgl,
      });

      if (ws.ocs) {
        ws.ocs.device_id = data.device_id;
      } else {
        ws.ocs = { device_id: data.device_id };
      }

      console.log(await respF.json());

      //  ws.send(JSON.stringify({ cmd: CommunicationCommand.REGISTER_DEVICE_SUCCESS }));
      sendCommandWebsocket(CommunicationCommand.REGISTER_DEVICE_SUCCESS, {}, ws);

    } catch (error) {
      //      ws.send(JSON.stringify({ cmd: CommunicationCommand.REGISTER_DEVICE_ERROR, data: { message: error.message } }));
      // @ts-ignore
      sendCommandWebsocket(CommunicationCommand.REGISTER_DEVICE_ERROR, { message: error.message }, ws);

    }

  }

}

/**
 * @param {{ send: (arg0: string) => void; }} WebSocketClient
 * @param {number} command
 * @param {any} data
 */
function sendCommandWebsocket(command, data, WebSocketClient) {
  if (WebSocketClient) {
    WebSocketClient.send(JSON.stringify({ cmd: command, data: data }));
  } else {
    console.log('sendCommandWebsocket: Not websocket client.');
  }
}

/**
 * @param {any} id_group
 */
async function getListDevicesByGroup(id_group) {
  let list_group = [];

  try {
    // Obtiene la lista de dispositivos asociados a ese grupo
    let resp_tgd = await fetchOCSGet(OCS_URL_ADMIN_DEVICE, {
      id_group: id_group,
    });

    // Lista de grupos
    list_group = await resp_tgd.json();

    console.log('getListDevicesByGroup >> ', id_group, list_group);

  } catch (error) {
    console.trace(error);
  }

  return list_group;
}

/**
 * @param {{ cmd: number; data: { device_id: string; name: any; chip: any; chip_model: any; chip_version: any; }; }} command
 * @param {{ send: any; APIServer: any; ocs?: any; }} websocket_client
 * @param {any[]} websocket_clients
 */
export async function commandFromDevices(command, websocket_client, websocket_clients) {

  if (command.cmd && CommunicationCommandFromNumberExists(command.cmd)) {

    switch (command.cmd) {

      case CommunicationCommand.REGISTER_DEVICE:
        await RegisterDevice(command.data, websocket_client);
        break;
      default:
        console.log(`Command ${command.cmd} not implemented.`);
        break;
    }

  } else {
    console.log(`Command ${command.cmd} not found`);
  }
}



/**
 * @param {{ cmd: number; data: { id_group: any; }; }} command
 * @param {any[]} websocket_clients
 */
export async function commandFromGroup(command, websocket_clients) {

  if (command.cmd && CommunicationCommandFromNumberExists(command.cmd)) {

    /**
     * @type {{ device_id: any; }[]}
     */
    let device_by_groups = [];

    if (command.data.id_group) {
      // Obtener la lista de dispositivos del grupo
      device_by_groups = await getListDevicesByGroup(command.data.id_group);

      console.log(`Groups: ${device_by_groups.length} | websocket_clients: ${websocket_clients.length}`);

      if (device_by_groups.length > 0) {
        switch (command.cmd) {

          case CommunicationCommand.ALARM:
            //       await RegisterDevice(command.data, websocket_client);
            device_by_groups.forEach((/** @type {{ device_id: any; }} */ g) => {

              let wsClient = websocket_clients.find((c) => {
                console.log(`Compare g ${g.device_id} == ${c.ocs.device_id}`);
                return g.device_id == c.ocs.device_id;
              });

              sendCommandWebsocket(CommunicationCommand.ALARM, command.data, wsClient);

            });

            break;
          default:
            console.log(`Command ${command.cmd} not implemented.`);
            break;
        }
      } else {

        console.log('No hay dispositivos registrados');

      }

    } else {
      console.log(`id_group undefined`);
    }

  } else {
    console.log(`Command ${command.cmd} not found`);
  }
}

/*
export const fn_getDeviceAndGroupByIdGroup = async (
   req,
   res,
   data
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
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
};
*/