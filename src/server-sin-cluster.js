//-- No tiene WebSocket funcional por usar Cluster --//
require("dotenv").config({ override: true });
//const { PORT, NODE_ENV, TOKEN_ENCRYPT } = process.env;

const { Token } = require("@edwinspire/tokens/Tokendb");
const { Server } = require("@edwinspire/express-server/Server");
const community_safety =
  require("@edwinspire/telegraf/community-safety").Telegraf;
const SendEvent = require("@edwinspire/oms/SendEvent");

import fs from "fs";

// Para generar los certificados correr el siguiente comando, completar los datos que solicita y copiar los dos archivos que se generan
// openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt
var privateKey = fs.readFileSync("./certs/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./certs/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate, requestCert: false };

let iToken = new Token();
iToken.deleteAll();

/*
let CommunitySafetyBot = new community_safety();

  
  CommunitySafetyBot.launch();

  CommunitySafetyBot.on("APAGAR", async (ctx) => {
    let EventData = {
      idaccount: 10,
      ideventtype: 315,
      details: { message: ctx.message },
      source: ctx.message.text || "No definido",
    };

    let reevent = await SendEvent(EventData);
    ctx.reply("APAGAR dispositivos " + JSON.stringify(reevent));
  });
*/

  let ServerInstance = new Server({
    credentials: credentials,
    cluster: cluster,
    listen_notification_list: ["events.data", "test"],
  });

  let pgNotifyProcess = {};
  pgNotifyProcess["test"] = (notify) => {
    console.log("NOTIFY TEST", notify);
  };
  pgNotifyProcess["events.data"] = (notify) => {
    ServerInstance.socketio.emit("events.data", notify);
  };

  ServerInstance.on("pgNotify", (notify) => {
    //console.log("ServerInstance", notify.channel);
    //ServerInstance.socketio.emit("chat", notify);
    pgNotifyProcess[notify.channel](notify);

  });

ServerInstance.socketio.on('connection', (s)=>{
  ServerInstance.socketio.emit("chat", "Bienvenido " + s.id);
});




//Formato de mensajes que se deben enviar desde ESP32 42["chat",{"id": "67", "name": "p"}]
