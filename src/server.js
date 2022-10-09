// @ts-nocheck
import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { handler } from '../build/handler.js'
import { TelegrafOCS } from './lib/classes/telegraf/telegraf_websocket.js'
import { WebSocketExpress } from '@edwinspire/websocket_express/src/index.js'
//import {DataBase} from './lib/ocs/apirest.js';
import crypto from 'crypto'

const { PORT, EXPRESSJS_SERVER_TIMEOUT } = process.env

var listDeviceSockets = {}
var listAuthorizedDevices = {
  '72d448af-4e1a-4d54-8bf1-f7fb2536d51e': {
    telegram_groups: ['eca0ddf986277544059c57ac87b50373'],
    geox: 0,
    geoy: 0,
  },
  '624e8fdf-91bc-463d-bec9-44d8d0b74c0b': {},
  'e272dd45-e4c9-4344-bbfa-de73171f380b': {},
  telegrambot: {},
  '1e9058bf-26b1-4341-a694-bbbd5833c00e': {
    telegram_groups: ['eca0ddf986277544059c57ac87b50373'],
  },
  '00a0aa00-aa00-0000-0000-000000000000': {
    description: 'Default device uuid',
  },
}

let CommunitySafetyBot = new TelegrafOCS()
CommunitySafetyBot.launch()

CommunitySafetyBot.on('event', (e) => {
  switch (e.event.event) {
    case 'set_alarm':
      wsSendMessageToDevices({
        message: { command: 1, alarm_type: e.event.data.alarm_type },
        uuid_group: e.uuid_group,
      })

      break
  }
})

function wsSendMessageToDevices({ message, uuid_group, from_device }) {
  console.log('wsSendMessageToDevices ==>> ')

  Object.keys(listDeviceSockets).forEach((key, index) => {
    let { socket, device } = listDeviceSockets[key]

    // console.log('device ==>> ', index, device, uuid_group, from_device)

    if (socket && device && key != from_device) {
      // console.log('Dispositivo habilitado...')

      // Verifica que haya uuid_group, si lo hay verifica que pertenezca a algún grupo, caso contrario no valida el grupo y envía el mensaje
      if (
        uuid_group &&
        device.telegram_groups &&
        device.telegram_groups.includes(uuid_group)
      ) {
        socket.send(JSON.stringify(message))
      } else {
        socket.send(JSON.stringify(message))
      }
    }
  })
}

function sendMessageToGroup(deviceid, message) {
  console.log('sendMessageToGroup ==>> deviceid', deviceid)

  let device = listDeviceSockets[deviceid]

  console.log('device ==> ', device)

  if (device && device.device && device.device.telegram_groups) {
    device.device.telegram_groups.forEach((group) => {
      CommunitySafetyBot.sendMessageToGroupFromUUID(group, message)
    })
  }
}

const app = express()
const httpServer = createServer(app)

const webSocketServer = new WebSocketExpress(
  httpServer,
  undefined,
  authentication_websocket,
)
webSocketServer.on('client_connection', (data) => {
  let deviceid = data.url.searchParams.get('device')
  if (data.url.pathname == '/ws/device' && deviceid) {
    listDeviceSockets[deviceid] = {
      socket: data.socket,
      isAuthenticated: true,
      device: listAuthorizedDevices[deviceid],
    }
  }
})

webSocketServer.on('message', (data) => {
  //console.log('Message', Date.now(), data.url)

  if (
    data.url.pathname.startsWith('/ws/device') &&
    data.url.searchParams.get('device')
  ) {
    onMessageFromDevice(data)
  }
})

app.use(handler)

let rto = 1000 * 60 * 5
if (EXPRESSJS_SERVER_TIMEOUT && Number(EXPRESSJS_SERVER_TIMEOUT) > 1000) {
  rto = Number(EXPRESSJS_SERVER_TIMEOUT)
}
console.log('EXPRESSJS_SERVER_TIMEOUT: ' + EXPRESSJS_SERVER_TIMEOUT)
httpServer.setTimeout(rto) // Para 5 minutos

httpServer.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})

function authentication_websocket(request, socket, head, urlData) {
  //console.log('Autenticación', urlData)
  let isAuthenticated = false
  let deviceid = urlData.searchParams.get('device')
  if (urlData.pathname == '/ws/device' && deviceid) {
    if (listAuthorizedDevices[deviceid]) {
      isAuthenticated = true
    }

    listDeviceSockets[deviceid] = {
      //socket: isAuthenticated ? socket : undefined,
      isAuthenticated: isAuthenticated,
      device: listAuthorizedDevices[deviceid],
    }
  } else {
    isAuthenticated = true
  }

  return isAuthenticated
}

function onMessageFromDevice(data) {
  try {
    let msg = JSON.parse(data.message.toString())

    if (msg.command) {
      onwsCommandDevice(msg, data)
    } else if (msg.request) {
      onwsRequestdevice(msg, data)
    } else if (msg.event) {
      onwsEventDevice(msg, data)
    }
  } catch (error) {
    console.trace(error)
  }
}

function onwsEventDevice(message, client_data) {
  console.log('onwsEventDevice ===>>>')

  switch (message.event) {
    case 'SZ': // Cambio de estado de la zona
      switch (message.data.status) {
        case 1: // Set alarm
          console.log('SET ALARM')
          wsSendMessageToDevices({
            message: {
              command: 1,
              alarm_type: 1,
            },
            // uuid_group: '',
            from_device: client_data.url.searchParams.get('device'),
          })
          sendMessageToGroup(
            client_data.url.searchParams.get('device'),
            'ALARMA DESDE PULSADOR FISICO',
          )
          break
      }

      break
  }
}

function onwsCommandDevice(message, client_data) {
  console.log('******* onwsCommandDevice - NO IMPEMENTADO *******')
}

function onwsRequestdevice(message, client_data) {
  switch (message.request) {
    case 1000:
      if (
        client_data.url.searchParams.get('device') ==
        '00a0aa00-aa00-0000-0000-000000000000'
      ) {
        client_data.socket.send(
          JSON.stringify({ command: 1000, deviceid: crypto.randomUUID() }),
        )
        setTimeout(() => {
          client_data.socket.terminate()
        }, 3000)
      } else {
        console.log('No es deviceid default')
      }
      break
  }
}
