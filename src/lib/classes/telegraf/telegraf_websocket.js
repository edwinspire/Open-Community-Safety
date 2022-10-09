// @ts-nocheck
const { BOT_TOKEN, PORT, MQTT_BROKER, MQTT_PORT, MQTT_ROOT_TOPIC } = process.env
import crypto from 'crypto'
console.log('BOT_TOKEN: ', BOT_TOKEN)
import WebSocket from 'ws'
import { EventEmitter } from 'events'
import { Telegraf, Markup } from 'telegraf'

const textEmergency = '🚨 EMERGENCIA'
const textwarning = '⚠ ADVERTENCIA'
const textTest = '🔈 PRUEBA'
const textTurnoff = '🔇 APAGAR'

const DBJson = {
  OCSeca0ddf986277544059c57ac87b50373: {
    id_group: -1001622810034,
    devices: [{ id_device: 'OCS_3D59F8' }, { id_device: 'OCS_E34AB1' }],
  },
}

var listGroups = {}

//@ts-ignore

export class TelegrafOCS extends EventEmitter {
  constructor() {
    super()

    //   this.FDataNode = new FetchDataNode();
    this.ws_client = undefined
    // @ts-ignore
    this.bot = new Telegraf(BOT_TOKEN)

    this.bot.command('getid', (ctx) => {
      //console.log('consulta grupo >>> ', ctx.update.message.chat.id);
      ctx.reply(
        'idgroup: ' + TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
      )
    })

    this.bot.command('register', async (ctx) => {
      ctx.reply('Un momento por favor. Se está registrando el grupo...')
      try {
        /*
                let res = await this.FDataNode.post(
                    ServerRoot() + "/pgapi/OpenCommunitySecurity/Account",
                    ctx.update.message
                );
                let data_res = await res.json();
                */
        /*
                ctx.reply(
                    data_res.account_name +
                    " se encuentra registrado. ID: " +
                    data_res.uniqueid
                );
                */
      } catch (error) {
        console.log(error)
        ctx.reply('Ocurrió un error, no se pudo registrar')
      }
    })

    this.bot.command('/start', (ctx) => {
      return ctx.reply(
        'Seleccione una opción',
        Markup.keyboard([
          // @ts-ignore
          [textEmergency],
          // @ts-ignore
          [textwarning],
          // @ts-ignore
          [textTest, textTurnoff],
        ])
          .oneTime()
          .resize(),
      )
    })

    this.bot.hears(textEmergency, async (ctx) => {
      this.sendEvent(ctx, 'EMERGENCIA', {
        event: 'set_alarm',
        data: { alarm_type: 1 },
      })
    })
    this.bot.hears(textwarning, (ctx) => {
      this.sendEvent(ctx, 'ADVERTENCIA', {
        event: 'set_alarm',
        data: { alarm_type: 2 },
      })
    })

    this.bot.hears(textTest, (ctx) => {
      console.log(textTest)
      this.sendEvent(ctx, 'PRUEBA', {
        event: 'set_alarm',
        data: { alarm_type: 3 },
      })
    })
    this.bot.hears(textTurnoff, (ctx) => {
      this.sendEvent(ctx, 'APAGAR', {
        event: 'set_alarm',
        data: { alarm_type: 0 },
      })
    })
  }

  // @ts-ignore
  sendEvent(ctx, message, event) {
    let uuid_group = TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id)

    listGroups[uuid_group] = ctx.update.message.chat.id

    this.emit('event', {
      event: event,
      uuid_group: uuid_group,
    })

    if (message && message.length > 0) {
      ctx.reply(
        `${message} => ${ctx.update.message.from.last_name} ${ctx.update.message.from.first_name}`,
      )
    }
  }

  // @ts-ignore
  cmndPublish(ctx, last_level_topic, payload, msg_reply) {
    this.publishToDevices(
      TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
      last_level_topic,
      payload,
    )

    if (msg_reply && msg_reply.length > 0) {
      ctx.reply(
        ctx.update.message.from.last_name +
          ' ' +
          ctx.update.message.from.first_name +
          ' ' +
          msg_reply,
      )
    }
  }

  publishToDevices(uuid_group, last_level_topic, payload) {
    let dataGroup = DBJson[uuid_group]
    console.log(dataGroup)

    if (dataGroup) {
      if (dataGroup.devices && dataGroup.devices.length > 0) {
        if (this.ws_client) {
          dataGroup.devices.forEach((dev) => {
            this.ws_client.send(payload)
          })
        } else {
          console.error('this.mqtt_client no se ha inicializado')
        }
      } else {
        this.sendMessageToGroup(
          dataGroup.idgroup,
          'No hay dispositivos asociados a este grupo.',
        )
      }
    }
    return dataGroup
  }

  async sendMessageToGroup(idgroup, message) {
    console.log('sendMessageToGroup => ', idgroup);
    if (idgroup) {
      try {
        await this.bot.telegram.sendMessage(Number(idgroup), message)
      } catch (error) {
        // @ts-ignore
        console.error(error.message)
      }
    }
  }

  async sendMessageToGroupFromUUID(uuid_group, message) {
    let idgroup = listGroups[uuid_group]
    return this.sendMessageToGroup(idgroup, message)
  }

  // @ts-ignore
  static getUUIDGroup(idgroup) {
    let c = crypto
      .createHash('md5')
      .update(JSON.stringify(idgroup))
      .digest('hex')
    console.log('MD5 de ', idgroup, JSON.stringify(idgroup), c)
    return c
  }

  launch() {
    try {
      this.ws_client = new WebSocket(
        'ws://localhost:'+PORT+'/ws/device?device=telegrambot',
      )

      this.ws_client.on('open', () => {
        this.ws_client.send(JSON.stringify({ command: 'start', params: {} }))
      })

      this.ws_client.on('message', (m) => {
        console.log('Cliente ws =>', m.toString())
      })

      this.ws_client.on('close', () => {
        console.log('CERRADO')
      })

      this.ws_client.on('error', (e) => {
        console.log('ERROR', e)
      })
    } catch (error) {
      console.trace(error)
    }

    this.bot.launch()
  }
}
