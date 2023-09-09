import { handler } from "../build/handler.js";
import { ServerAPI } from "@edwinspire/libapiserver";
import { v4 as uuidv4 } from "uuid";
import ocsdb from "./lib/ocs/database/sequelize.js";
import { device as devicedb } from "./lib/ocs/database/models/devices.js";
import { local_host_root, app_name } from "./lib/ocs/utils.js";
import { fn_upsertDevice } from "./lib/ocs/fn/device.js";
import uF from "@edwinspire/universal-fetch";
import { DataTypes, NOW } from "sequelize";

const { BUILD_DB_ON_START } = process.env;

const uFetch = new uF();

try {
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

  server.on("websocket_message", async (e) => {
    let data = JSON.parse(e.data);

    console.log(">>>> websocket_message >>", e.data, data);

    if (data.req == 1000) {
      // Registra dispositivo
      if (data.deviceId == "00a0aa00-aa00-0000-0000-000000000000") {
        // Si tiene el valor por default se le envía uno nuevo
        console.log("Default id -  se devuelve un nuevo id");

        e.ws.send(JSON.stringify({ cmd: 1000, deviceId: uuidv4() }));
      } else {
        // Tiene ya un id asignado, se registra el dispositivo
        console.log("Registrar dispositivo", e.ws.APIServer);

        uFetch.setBasicAuthorization(
          e.ws.APIServer.authorization.username,
          e.ws.APIServer.authorization.password
        );

        let data_values = data.data;

        let respF = await uFetch.post(
          local_host_root("api/ocs/devices/admin/v0.01/dev"),
          {
            uuid: data_values.deviceId,
            name: data_values.name,
            last_connection: Date.now(),
            chip: data_values.chip,
            chip_model: data_values.chip_model,
            chip_version: data_values.chip_version,
            latitude: data_values.lat,
            longitude: data_values.lon,
            allow_activation_by_geolocation: data_values.acbgl,
          }
        );

        console.log(await respF.json());
      }
    } else {
      console.log("No es mil", data.req);
    }
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

  server.appendAppFunction(app_name, "UpsertDevice", fn_upsertDevice);

  server.listen();
} catch (error) {
  console.trace(error);
}
