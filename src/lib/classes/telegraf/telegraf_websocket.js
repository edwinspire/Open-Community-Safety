// @ts-nocheck
const { BOT_TOKEN, PORT } = process.env
import crypto from 'crypto'
//console.log('BOT_TOKEN: ', BOT_TOKEN)
import WebSocket from 'ws'
import { EventEmitter } from 'events'
import { Telegraf, Markup } from 'telegraf'
import { telegram_groups as tgdb } from '../../../lib/ocs/database/models/telegram_groups.js'
import { device as devicedb } from '../../../lib/ocs/database/models/devices.js'
import dbsequelize from '../../../lib/ocs/database/sequelize.js'
import { QueryTypes } from 'sequelize'
import jwt from 'jsonwebtoken'

const telegrambotref = 'ad509bae25bff24934ade98570462d7f' // uuid para poderse conectar al websocket
const textEmergency = '🚨 EMERGENCIA'
const textwarning = '⚠ ADVERTENCIA'
const textTest = '🔈 PRUEBA'
const textTurnoff = '🔇 APAGAR'

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

    this.bot.command('getdevices', async (ctx) => {
      console.log(
        'consulta getdevices >>> ',
        ctx.update.message.chat.id,
        TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
      )
      try {
        // const data = await devicedb.findAll({ where: { uuid: r.deviceId } })
        const list_devices = await dbsequelize.query(
          `SELECT dev.iddevice, dev.uuid, dev.name, dev.chip_model, dev.latitude, dev.longitude, dev.iddevicestatus, dev.allow_activation_by_geolocation, tg.idtg
       FROM public.devices dev
         INNER JOIN 
         telegram_groups_devices tg ON dev.uuid = tg.uuid
         WHERE tg.idtg = :idtg`,
          {
            logging: console.log,
            type: QueryTypes.SELECT,
            replacements: {
              idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
            },
          },
        )

        if (
          list_devices &&
          Array.isArray(list_devices) &&
          list_devices.length > 0
        ) {
          let lista_str = list_devices.map((d, index) => {
            return `${index+1}) deviceId: ${d.uuid} - Name: ${d.name}`
          })

          ctx.reply('Devices:\n' + lista_str.join('\n'))
        } else {
          ctx.reply('No se encuentran dispositivos registrados en este grupo')
        }
      } catch (error) {
        console.log('error: ', error)
        ctx.reply('devices: ' + JSON.stringify(error))
      }
    })

    this.bot.command('register', async (ctx) => {
      ctx.reply('Un momento por favor. Se está registrando el grupo...')
      try {
        console.log(ctx.update.message)
        const data = await tgdb.upsert({
          idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
          group: ctx.update.message.chat.id,
          name: ctx.update.message.chat.title,
        })

        if (data && Array.isArray(data) && data.length > 0) {
          let datatg = data[0]

          ctx.reply(
            datatg.name + ' se encuentra registrado. ID: ' + datatg.idtg,
          )
        }
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
        data: { siren_type: 2 },
      })
    })
    this.bot.hears(textwarning, (ctx) => {
      this.sendEvent(ctx, 'ADVERTENCIA', {
        event: 'set_alarm',
        data: { siren_type: 3 },
      })
    })

    this.bot.hears(textTest, (ctx) => {
      console.log(textTest)
      this.sendEvent(ctx, 'PRUEBA', {
        event: 'set_alarm',
        data: { siren_type: 4 },
      })
    })
    this.bot.hears(textTurnoff, (ctx) => {
      this.sendEvent(ctx, 'APAGAR', {
        event: 'set_alarm',
        data: { siren_type: 0 },
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

  /*
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
  */

  /*
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
  */

  async sendMessageToGroup(idgroup, message) {
    console.log('sendMessageToGroup => ', idgroup)
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
    let idgroup

    try {
      let tg = await tgdb.findAll({
        where: {
          idtg: uuid_group,
        },
      })

      if (tg && Array.isArray(tg) && tg.length > 0) {
        idgroup = tg[0].group
      }
    } catch (error) {
      console.log(error)
    }

    return await this.sendMessageToGroup(idgroup, message)
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

  createDeviceToken(deviceId) {
    return jwt.sign(
      { deviceId: deviceId || crypto.randomUUID() },
      process.env.JWT_PASSWORD,
    )
  }

  launch() {
    try {
      this.ws_client = new WebSocket(
        'ws://localhost:' +
          PORT +
          '/ws/device?deviceId=' +
          this.createDeviceToken(telegrambotref),
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
