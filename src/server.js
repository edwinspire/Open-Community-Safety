import { handler } from "../build/handler.js";
import { ServerAPI } from "@edwinspire/libapiserver";
import ocsdb from "./lib/ocs/database/sequelize.js";
import { device as devicedb } from "./lib/ocs/database/models/devices.js";
import { telegram_groups_devices } from "./lib/ocs/database/models/telegram_groups_devices.js";
import { app_name } from "./lib/ocs/utils.js";
import { fn_upsertDevice, processCMD, processRequest } from "./lib/ocs/fn/device.js";
import { fn_upsertTelegramGroup } from "./lib/ocs/fn/telegram_groups.js";
import { fn_upsertTelegramGroupDevices } from "./lib/ocs/fn/telegram_groups_devices.js";
import { TelegrafOCS } from './lib/ocs/telegraf.js'

const { BUILD_DB_ON_START, OCS_URL_WS_DEVICE } =
	process.env;

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
			//console.log(">>>> websocket_message >>", e.data);
			let data = JSON.parse(e.data);

			if (data.req) {
				processRequest(data, e, server.websocketClients(OCS_URL_WS_DEVICE));
			} else if (data.cmd) {
				console.log("Command");
				processCMD(data, e, server.websocketClients(OCS_URL_WS_DEVICE));
			} else if (data.tele) {
				console.log("Tele");
			}
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

	server.appendAppFunction(app_name, "UpsertDevice", fn_upsertDevice);
	server.appendAppFunction(app_name, "UpsertTelegramGroup", fn_upsertTelegramGroup);
	server.appendAppFunction(app_name, "UpsertTelegramGroupDevices", fn_upsertTelegramGroupDevices);


	let CommunitySafetyBot = new TelegrafOCS()
	CommunitySafetyBot.launch()

	/*
	CommunitySafetyBot.on('event', (e) => {
		switch (e.event.event) {
			case 'set_alarm':
				wsSendMessageToDevices({
					message: { command: 1, siren_type: e.event.data.siren_type },
					uuid_group: e.uuid_group,
				})

				break
		}
	})
	*/


	server.listen();
} catch (error) {
	console.trace(error);
}
