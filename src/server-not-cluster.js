require("dotenv").config({ override: true });
const { Token } = require("@edwinspire/tokens/Tokendb");
const { Server } = require("@edwinspire/express-server/Server");
const community_safety =
  require("@edwinspire/telegraf/community-safety").Telegraf;
//const { FetchDataNode } = require("@edwinspire/fetch/FetchDataNode");
//const SendEvent = require("@edwinspire/oms/SendEvent");

import fs from "fs";

// Para generar los certificados correr el siguiente comando, completar los datos que solicita y copiar los dos archivos que se generan
// openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt
var privateKey = fs.readFileSync("./certs/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./certs/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate, requestCert: false };

let iToken = new Token();
let CommunitySafetyBot = new community_safety();
//const FDataNode = new FetchDataNode();

iToken.deleteAll();
  CommunitySafetyBot.launch();

  let ServerInstance = new Server({
    credentials: credentials,
    listen_notification_list: ["events.data", "test"],
  });

  let pgNotifyProcess = {};
  pgNotifyProcess["test"] = (notify) => {
    console.log("NOTIFY TEST", notify);
  };

  pgNotifyProcess["events.data"] = async (notify) => {
    try {
      let payloadNotify = JSON.parse(notify.payload);
      if (payloadNotify && payloadNotify.idevent && payloadNotify.idevent > 0) {
        let event = await community_safety.getEventById(payloadNotify.idevent);
        community_safety.EmitEventToNameSpace(ServerInstance.socketio, event);
        //CommunitySafetyBot.sendMessageToGroup(event);
      } else {
        console.error('pgNotifyProcess - El evento no es válido', notify);
      }
    } catch (error) {
      console.log('ServerInstance Error: ', error);
    }
  };

  ServerInstance.on("pgNotify", (notify) => {
    pgNotifyProcess[notify.channel](notify);
  });


  community_safety.CreateSocketIONameSpace(ServerInstance.socketio);


