require("dotenv").config({ override: true });
const fn_set_expired_lifetime = require("@tasks/fn_set_expired_lifetime");
const fn_sendemail = require("@tasks/fn_sendemail");
const { pgWebPush } = require("@app_express_routes/webpush.js");

//import sio from "socket.io";
import * as sapper from "@sapper/server";
import sirv from "sirv";
import compression from "compression";
import virtual_route from "@app_express_routes/routes";
import fs from "fs";

var ExpiredEventsRunning = false;
var SendEmailRunning = false;
global.fecha = new Date();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Para generar los certificados correr el siguiente comando, completar los datos que solicita y copiar los dos archivos que se generan
// openssl req -x509 -nodes -days 1825 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt
var privateKey = fs.readFileSync("./certs/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./certs/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate, requestCert: false };

var express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


let app = express(); //instancia de express
let httpServer = require("https").createServer(credentials, app);
//let httpServer = require('http').Server( app);
let io = require("socket.io")(httpServer);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false, limit: 50000000 })); //-- Limit 50M
app.use(cookieParser());
app.use(compression());

app.use(virtual_route);
app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  sapper.middleware()
);

console.log(process.env.LOCAL_SERVER, process.env.DATABASE_URL);

//const PORT = process.env.PORT || 5000 // Esto lo define Heroku
//process.env.DATABASE_URL =  'postgresql://dbuser:secretpassword@database.server.com:3211/mydb';



io.on("message", function (socket) {
  console.log("A user connected", socket);
});

io.on("connection", (socket) => {

setInterval(() => {
  io.emit("chat", new Date()+ ' Papi Gallo...');
}, 2000);


  socket.on("chat", (msg) => {
    io.emit("chat", msg + new Date()+ 'Papi Gallo...');
  });
});

httpServer.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
