//-- No tiene WebSocket funcional por usar Cluster --//
require("dotenv").config({ override: true });
//const { OMS_SERVER } = process.env;
const { Token } = require("@edwinspire/tokens/Tokendb");
const { Server } = require("@edwinspire/express-server/Server");
const cluster = require("cluster");
const community_safety =
  require("@edwinspire/telegraf/community-safety").Telegraf;
const { FetchDataNode } = require("@edwinspire/fetch/FetchDataNode");
const SendEvent = require("@edwinspire/oms/SendEvent");

import fs from "fs";

// Para generar los certificados correr el siguiente comando, completar los datos que solicita y copiar los dos archivos que se generan
// openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt
var privateKey = fs.readFileSync("./certs/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./certs/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate, requestCert: false };

let iToken = new Token();
let CommunitySafetyBot = new community_safety();
const FDataNode = new FetchDataNode();
// Esto es para que se ejecute solo en el master y no en los workers
if (cluster.isMaster) {
  iToken.deleteAll();
  CommunitySafetyBot.launch();
}

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require("os").cpus().length;
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    let worker = cluster.fork();
  }
} else {
  // Define las acciones que se harán por cada tipo de evento
  let ServerInstance = new Server({
    credentials: credentials,
    cluster: cluster,
    listen_notification_list: ["events.data", "test"],
  });

  let pgNotifyProcess = {};
  pgNotifyProcess["test"] = (notify) => {
    console.log("NOTIFY TEST", notify);
  };

  pgNotifyProcess["events.data"] = async (notify) => {
    //console.log(notify);
    community_safety.EmitEventToNameSpace(ServerInstance.socketio, notify);
  };
  ServerInstance.on("pgNotify", (notify) => {
    pgNotifyProcess[notify.channel](notify);
  });


  community_safety.CreateSocketIONameSapce(ServerInstance.socketio);

}

// Listen for dying workers
cluster.on("exit", function (worker) {
  console.log("Worker %d died :(", worker.id);
  cluster.fork();
});