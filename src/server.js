import { handler } from "../build/handler.js";
import { ServerAPI } from "@edwinspire/libapiserver";
import ocsdb from "./lib/ocs/database/sequelize.js";
import { device as devicedb } from "./lib/ocs/database/models/devices.js";
import { telegram_groups_devices } from "./lib/ocs/database/models/telegram_groups_devices.js";
import { app_name, fetchOCS, CommunicationCommandFromNumberExists, CommunicationCommand } from "./lib/ocs/utils.js";
import {

  commandFromDevices, commandFromGroup
} from "./lib/ocs/fn/device.js";
//import { fn_upsertTelegramGroup } from "./lib/ocs/fn/telegram_groups.js";
//import { fn_upsertTelegramGroupDevices } from "./lib/ocs/fn/telegram_groups_devices.js";
import { TelegrafOCS } from "./lib/ocs/telegraf.js";

const { BUILD_DB_ON_START, OCS_URL_WS_DEVICE, OCS_URL_ADMIN_DEVICE } =
  process.env;

// Este bloque inicial carga los archivos de tareas de forma automática
/* 
 require("fs")
 .readdirSync(tasks_dir)
 .forEach(function (file) {
   if (file !== "private") {
   console.log("Load Task -> " + file);
   module.exports[path.basename(file, ".js")] = require(path.join(
     tasks_dir,
     file
   ));
   }
 });
 */


try {
  // @ts-ignore
  const server = new ServerAPI(true, handler);

  if (BUILD_DB_ON_START == "true") {
    ocsdb.sync({ alter: true }).then(
      () => {
        console.log("Crea la base de datos OCS");
      },
      (e) => {
        console.log("no se pudo crear / modificar la base de datos", e);
      }
    );
  }

  // Escucha los mensajes solo de la url indicada
  server.on(`ws/msg${OCS_URL_WS_DEVICE}`, async (e) => {

    if (e.request.url == OCS_URL_WS_DEVICE) {
      console.log(">>>> websocket_message >>", e.data);

      let data;
      try {
        data = JSON.parse(e.data);
      } catch (error) {
        console.trace(error);
        data = {};
      }

      commandFromDevices(data, e.ws, server.websocketClients(OCS_URL_WS_DEVICE));


      /*
      if (data.req) {
        processRequest(data, e, server.websocketClients(OCS_URL_WS_DEVICE));
      } else if (data.cmd) {
        console.log("Command");
        processCMD(data, e, server.websocketClients(OCS_URL_WS_DEVICE));
      } else if (data.tele) {
        console.log("Tele");
      }
      */

    }

    //	console.log('XXXXXXXXXXXXXXXXXXXXX', OCS_URL_WS_DEVICE, server.websocketClients(OCS_URL_WS_DEVICE));
  });

  /*
    server.on("ws_client_connection", (e)=>{
    console.log('ws_client_connection', e);
    });
    */

  /*
    server.on("ws_message", (e)=>{
      console.log('ws_message', String(e.message));
      });
      */

  /*
server.appendAppFunction(app_name, "UpsertDevice", fn_upsertDevice);
server.appendAppFunction(
app_name,
"UpsertTelegramGroup",
fn_upsertTelegramGroup
);
server.appendAppFunction(
app_name,
"UpsertTelegramGroupDevices",
fn_upsertTelegramGroupDevices
);
server.appendAppFunction(
app_name,
"GetDeviceAndGroupByIdGroup",
fn_getDeviceAndGroupByIdGroup
);
*/

  let CommunitySafetyBot = new TelegrafOCS();
  CommunitySafetyBot.launch();

  CommunitySafetyBot.on("event", async (e) => {
    console.log("CommunitySafetyBot event ---> ", e);

    if (e.cmd) {
      try {
        let list_clients = await server.websocketClients(OCS_URL_WS_DEVICE);

        await commandFromGroup(e, list_clients);

        /*
        await processCMD(
          {
            id_group: e.id_group,
            cmd: e.cmd,
            device_id: undefined,
            req: undefined,
            data: e.data
          },


          // @ts-ignore
          list_clients,
          e
        );
*/

      } catch (error) {
        console.log(error);
      }
    }
  });

  server.listen();
} catch (error) {
  console.trace(error);
}
