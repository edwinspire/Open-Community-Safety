// @ts-nocheck
import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { handler } from '../build/handler.js'
import { TelegrafOCS } from './lib/classes/telegraf/telegraf_websocket.js'
import { WebSocketExpress } from '@edwinspire/websocket_express/src/index.js'
import ocsdb from './lib/ocs/database/sequelize.js'
//import './lib/ocs/database/models/devices_status.js'
import { device as devicedb } from './lib/ocs/database/models/devices.js'
import { telegram_groups_devices as tgddb } from './lib/ocs/database/models/telegram_groups_devices.js'
//import { telegram_groups as tgdb } from './lib/ocs/database/models/telegram_groups.js'
import { enum_input_type as enum_input_type_db } from './lib/ocs/database/models/enum_input_types.js'

//import sqlitedb from './lib/apirest/database/sequelize.js'
//import { pruebas } from './lib/apirest/database/models/pruebas.js'

import sequelize from 'sequelize'

import jwt from 'jsonwebtoken'

//import {DataBase} from './lib/ocs/apirest.js';
//

import crypto from 'crypto'

const { PORT, EXPRESSJS_SERVER_TIMEOUT, BUILD_DB_ON_START } = process.env
const initialdeviceId = '00a0aa00-aa00-0000-0000-000000000000'

if (BUILD_DB_ON_START == 'true') {
  ocsdb.sync({ alter: true }).then(
    () => {
      console.log('Crea la base de datos')
    },
    (e) => {
      console.log('no se pudo crear / modificar la base de datos', e)
    },
  )
}

/*
sqlitedb.sync({ alter: true }).then(
  () => {
    console.log('Crea la base de datos sqlite')
  },
  (e) => {
    console.log('SQLITE no se pudo crear / modificar la base de datos', e)
  },
)
*/

/*
const InputType = [
  { text: "NONE", value: 0 },
  { text: "ALARM_MEDICAL", value: 100 },
  { text: "ALARM_FIRE", value: 101 },
  { text: "ALARM_PANIC", value: 102 },
  { text: "ALARM_BURGLARY", value: 103 },
  { text: "ALARM_GENERAL", value: 104 },
  { text: "ALARM_24H", value: 105 },
];

const SirenType = [
  { text: "UNABLED", value: 0 },
  { text: "SILENT", value: 1 },
  { text: "CONTINUOUS", value: 2 },
  { text: "PULSING", value: 3 },
  { text: "TEST", vaue: 4 },
];

const StatusZone = [
  { text: "TROUBLE", value: 3 },
  { text: "NORMAL", value: 1 },
  { text: "ALARM", value: 2 },
  { text: "UNDEFINED", value: 0 },
];
*/

const statusDevice = {
  Undefined: 0,
  Initialized: 1, // Cuando se le ha asignado el número de dispositivo
  Authorized: 2, // Cuando ya está autorizado y en funcionamiento
}

var listDeviceSockets = {}

let CommunitySafetyBot = new TelegrafOCS()
CommunitySafetyBot.launch()

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

async function wsSendMessageToDevices({ message, uuid_group, from_device }) {
  console.log('wsSendMessageToDevices ==>> ', uuid_group, from_device)

  // Obtenemos los dispositivos asociados a ese grupo
  const datatg = await tgddb.findAll({
    where: { idtg: uuid_group },
  })

  //console.log('listDeviceSockets = ', listDeviceSockets)

  if (datatg && Array.isArray(datatg)) {
    datatg.forEach((dev) => {
      console.log('dev.uuid ==>>> ', dev.uuid)
      if (listDeviceSockets[dev.uuid]) {
        listDeviceSockets[dev.uuid].send(JSON.stringify(message))
      }
    })
  }
}


/*
function sendMessageToGroup(deviceid, message) {
  console.log('sendMessageToGroup ==>> deviceid', deviceid)

  let device = listDeviceSockets[deviceid]

  //  console.log('device ==> ', device.)

  if (device && device.device && device.device.telegram_groups) {
    device.device.telegram_groups.forEach((group) => {
      CommunitySafetyBot.sendMessageToGroupFromUUID(group, message)
    })
  }
}
*/

const app = express()
const httpServer = createServer(app)

const webSocketServer = new WebSocketExpress(
  httpServer,
  undefined,
  authentication_websocket,
)

webSocketServer.on('client_connection', (data) => {
  // Verificamos que el cliente sea un dispositivo
  if (data.url.pathname == '/ws/device') {
    // Obtenemos el iddevice
    let datadevice = decodeddevicedata(data.url.searchParams.get('deviceId'))
    console.log('client_connection >> ', datadevice)
    if (!datadevice.error && datadevice.decoded.deviceId) {
      listDeviceSockets[datadevice.decoded.deviceId] = data.socket
    }
  }
})

webSocketServer.on('message', (data) => {
  //console.log('Message', Date.now(), data.url)

  if (
    data.url.pathname.startsWith('/ws/device') &&
    data.url.searchParams.get('deviceId')
  ) {
    onMessageFromDevice(data)
  }
})

app.use(handler)

let rto = 1000 * 60 * 5
if (EXPRESSJS_SERVER_TIMEOUT && Number(EXPRESSJS_SERVER_TIMEOUT) > 1000) {
  rto = Number(EXPRESSJS_SERVER_TIMEOUT)
}
//console.log('EXPRESSJS_SERVER_TIMEOUT: ' + EXPRESSJS_SERVER_TIMEOUT)
httpServer.setTimeout(rto) // Para 5 minutos

httpServer.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})

function decodeddevicedata(deviceToken) {
  let r = {}
  try {
    r.decoded = jwt.verify(deviceToken, process.env.JWT_PASSWORD)
  } catch (error) {
    r.error = error
  }
  return r
}

async function authentication_websocket(request, socket, head, urlData) {
  var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress
  //console.log('Autenticación', urlData, ip)
  let r = {
    deviceId: undefined,
    isAuthenticated: false,
    status: statusDevice.Undefined,
  }
  let deviceToken = urlData.searchParams.get('deviceId')
  if (urlData.pathname == '/ws/device' && deviceToken) {
    try {
      if (deviceToken == initialdeviceId) {
        // Deja pasar con estado 0, para asignarle un numero de dispositivo
        r.deviceId = deviceToken
        r.isAuthenticated = true
        r.status = statusDevice.Undefined
      } else {
        // Obtenemos el deviceId
        let decoded = decodeddevicedata(deviceToken)
        // console.log(decoded)

        if (!decoded.error) {
          r.deviceId = decoded.decoded.deviceId
          const data = await devicedb.findAll({ where: { uuid: r.deviceId } })
          // Conectamos a la base de datos y verificamos si existe y está autorizado
          // console.log(data)

          if (data && Array.isArray(data) && data.length > 0) {
            r.deviceId = data[0].deviceId
            r.isAuthenticated = true
            r.status = data[0].status
          } else {
            const data = await devicedb.upsert({
              uuid: r.deviceId,
              iddevicestatus: statusDevice.Initialized,
              ts: sequelize.fn('NOW'),
            })
            console.log('data 2 : ', data)
            // r.deviceId = data[0].deviceId
            r.isAuthenticated = true
          }
        } else {
          console.log(decoded.error)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(r)
  return r
}

function onMessageFromDevice(data) {
  try {
    let msg = JSON.parse(data.message.toString())
    console.log('onMessageFromDevice >>>>>> ', msg)
    if (msg.command) {
      onwsCommandDevice(msg, data)
    } else if (msg.request) {
      onwsRequestdevice(msg, data)
    } else if (msg.event) {
      onwsEventDevice(msg, data)
    } else if (msg.response) {
      onwsResponseDevice(msg, data)
    }
  } catch (error) {
    console.trace(error)
  }
}

// Procesa la respuesta a un requerimiento realizado al dispositivo
async function onwsResponseDevice(message, client_data) {
 // console.log('onwsResponseDevice ===>>>', message)

  switch (message.response) {
    case 1000: // Responde a solicitud de datos de configuración
    //  console.log('Datos de configuración del dispositivo', message.data)

      try {
        let datadev = decodeddevicedata(message.data.deviceId)
        if (datadev && !datadev.error) {
          let updev = await devicedb.update(
            {
              last_connection: sequelize.fn('NOW'),
              latitude: message.data.latitude,
              longitude: message.data.longitude,
              chip_model: message.data.ChipModel,
              name: message.data.name,
              allow_activation_by_geolocation: message.data.acbgl,
              ts: sequelize.fn('NOW'),
            },
            {
              where: {
                uuid: datadev.decoded.deviceId,
              },
            },
          )
          console.log(updev)
        }
      } catch (error) {
        console.trace(error)
      }

      break
  }
}

// Procesa un evento generado en un dispositivo
async function onwsEventDevice(message, client_data) {
  console.log('onwsEventDevice ===>>>', message)
  console.log('SET ALARM', message.event.input)

  switch (message.event.input.status) {
    case 2: // Cambio de estado de la zona
      try {
        let datadev = decodeddevicedata(message.event.deviceId)

        if (datadev && !datadev.error) {
          // Obtiene la etiqueta del tipo de entrada que genera la alarma
          const datainputtype = await enum_input_type_db.findAll({
            where: { id: message.event.input.config.type },
          })
          let label_input = 'EMERGENCIA'
          if (
            datainputtype &&
            Array.isArray(datainputtype) &&
            datainputtype.length > 0
          ) {
            label_input = datainputtype[0].label
          }

          // Envia mensaje a los grupos asociados al dispositivo
          const datatg = await tgddb.findAll({
            where: { uuid: datadev.decoded.deviceId },
          })

          if (datatg && Array.isArray(datatg)) {
            datatg.forEach((tg) => {
              CommunitySafetyBot.sendMessageToGroupFromUUID(
                tg.idtg,
                label_input + ': ' + message.event.input.config.name,
              )
              // Envia la señal a todos los dispositivos asociados al grupo
              wsSendMessageToDevices({
                message: {
                  command: 1,
                  siren_type: message.event.input.config.siren_type,
                },
                uuid_group: tg.idtg,
              })
            })
          }
        }
      } catch (error) {
        console.trace(error)
      }

      break
  }
}

function onwsCommandDevice(message, client_data) {
  console.log('******* onwsCommandDevice - NO IMPEMENTADO *******')
}

function createDeviceToken(deviceId) {
  return jwt.sign(
    { deviceId: deviceId || crypto.randomUUID() },
    process.env.JWT_PASSWORD,
  )
}

// Recibe solicitudes de los dispositivos por websocket
function onwsRequestdevice(message, client_data) {
  console.log(message)
  switch (message.request) {
    case 1000:
      console.log(
        'DEVICE ===>>>> ',
        client_data.url.searchParams.get('deviceId'),
      )

      if (client_data.url.searchParams.get('deviceId') == initialdeviceId) {
        var token = createDeviceToken()
        // console.log('TOKEN ===> ', token)
        client_data.socket.send(
          JSON.stringify({ command: 1000, deviceId: token }),
        )
        setTimeout(() => {
          client_data.socket.terminate()
        }, 5000)
      } else {
        console.log(
          'Dispositivo tiene deviceId - Se le solicita datos de su configuración',
        )
        client_data.socket.send(JSON.stringify({ request: 1000 }))
      }
      break
  }
}
