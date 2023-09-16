// @ts-nocheck
const {
  BOT_TOKEN,
  PORT,
  JWT_KEY,
  LOCAL_WS_USERNAME,
  LOCAL_WS_PASSWORD,
  OCS_URL_WS_DEVICE,
  OCS_URL_TELEGRAM_GROUPS,
  OCS_URL_ADMIN_DEVICE,
  OCS_URL_TELEGRAM_DEVICES,
} = process.env;
import crypto from "crypto";
//console.log('BOT_TOKEN: ', BOT_TOKEN)
//import WebSocket from "ws";
import { EventEmitter } from "events";
import { Telegraf, Markup, session, Scenes } from "telegraf";
//import { telegram_groups as tgdb } from './database/models/telegram_groups.js'
//import { device as devicedb } from '../../../lib/ocs/database/models/devices.js'
import dbsequelize from "./database/sequelize.js";
import { QueryTypes } from "sequelize";
import jwt from "jsonwebtoken";
import { fetchOCS } from "./utils.js";

//const telegrambotref = "ad509bae25bff24934ade98570462d7f"; // uuid para poderse conectar al websocket
const textEmergency = "🚨 EMERGENCIA";
const textwarning = "⚠ ADVERTENCIA";
const textTest = "🔈 PRUEBA";
const textTurnoff = "🔇 APAGAR";

var listGroups = {};

//@ts-ignore

export class TelegrafOCS extends EventEmitter {
  constructor() {
    super();

    //   this.FDataNode = new FetchDataNode();
    this.ws_client = undefined;
    // @ts-ignore
    this.bot = new Telegraf(BOT_TOKEN);

    this.bot.use(session());

    //    this.bot.start((ctx) => ctx.reply('Welcome'))

    this.bot.command("registrar_grupo", (ctx, next) => {
      console.log(">>>>> 0 >>> ", ctx.update.update_id, ctx);
      ctx.reply(
        "¡Hola! Bienvenido al asistente de recopilación de información."
      );

      ctx.session = ctx.session || {};

      ctx.session.wizard = ctx.session.wizard || {};

      ctx.session.wizard.step = 1; // Iniciar el wizard
      ctx.session.wizard.process = "register_group";
      next();
    });

    this.bot.command("registrar_dispositivo", (ctx, next) => {
      //      console.log('>>>>> 0 >>> ', ctx.update.update_id, ctx);
      ctx.reply(
        "¡Hola! Bienvenido al asistente de recopilación de información."
      );

      ctx.session = ctx.session || {};

      ctx.session.wizard = ctx.session.wizard || {};

      ctx.session.wizard.step = 1; // Iniciar el wizard
      ctx.session.wizard.process = "register_device";
      next();
    });

    /////////////////////////////////////////////////////////
    this.bot.command("getid", (ctx, next) => {
      this.idGroup(ctx);
    });

    this.bot.command("id", (ctx) => {
      this.idGroup(ctx);
    });

    this.bot.command("getdevices", async (ctx) => {
      console.log(
        "consulta getdevices >>> ",
        ctx.update.message.chat.id,
        TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id)
      );
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
          }
        );

        if (
          list_devices &&
          Array.isArray(list_devices) &&
          list_devices.length > 0
        ) {
          let lista_str = list_devices.map((d, index) => {
            return `${index + 1}) deviceId: ${d.uuid} - Name: ${d.name}`;
          });

          ctx.reply("Devices:\n" + lista_str.join("\n"));
        } else {
          ctx.reply("No se encuentran dispositivos registrados en este grupo");
        }
      } catch (error) {
        console.log("error: ", error);
        ctx.reply("devices: " + JSON.stringify(error));
      }
    });
    /*
        this.bot.command("register", async (ctx, next) => {
          this.registerGroup(ctx, next);
        });
    
        this.bot.command("registrar", async (ctx, next) => {
          this.registerGroup(ctx, next);
        });
    */

    this.bot.command("menu", (ctx) => {
      return ctx.reply(
        "Seleccione una opción",
        Markup.keyboard([
          // @ts-ignore
          [textEmergency],
          // @ts-ignore
          [textwarning],
          // @ts-ignore
          [textTest, textTurnoff],
        ])
          .oneTime()
          .resize()
      );
    });

    this.bot.hears(textEmergency, async (ctx) => {
      this.sendEvent(ctx, "EMERGENCIA", {
        event: "set_alarm",
        data: { siren_type: 2 },
      });
    });
    this.bot.hears(textwarning, (ctx) => {
      this.sendEvent(ctx, "ADVERTENCIA", {
        event: "set_alarm",
        data: { siren_type: 3 },
      });
    });

    this.bot.hears(textTest, (ctx) => {
      console.log(textTest);
      this.sendEvent(ctx, "PRUEBA", {
        event: "set_alarm",
        data: { siren_type: 4 },
      });
    });
    this.bot.hears(textTurnoff, (ctx) => {
      this.sendEvent(ctx, "APAGAR", {
        event: "set_alarm",
        data: { siren_type: 0 },
      });
    });

    //////////////////////////////////////

    /*
        // Middleware para manejar la conversación
        this.bot.use(async (ctx, next) => {
          console.log('>>>>>> 1 >>> ', ctx.update.update_id, ctx);
          ctx.session = ctx.session || {};
    
          if (!ctx.session.wizard) {
            ctx.session.wizard = {};
            ctx.session.wizard.step = 1;
          }
    
          await next();
        });
        */
    /*
        // Middleware para recopilar el nombre del usuario
        this.bot.use(async (ctx, next) => {
          console.log('>>>>>> 2 >>> ', ctx.update.update_id, ctx.session);
          if (ctx.session.wizard.step === 1) {
            ctx.reply('Por favor, ingresa tu nombre: ' + ctx.session.wizard.step);
            ctx.session.wizard.step++;
          } else {
            await next();
          }
        });
    */
    /*
        // Middleware para recopilar el teléfono del usuario
        this.bot.use(async (ctx, next) => {
          console.log('>>>>>> 3 >>> ', ctx.update.update_id, ctx.session);
          if (ctx.session.wizard.step === 2) {
            ctx.session.wizard.name = ctx.message.text;
            ctx.reply('Gracias, ahora ingresa tu número de teléfono:');
            ctx.session.wizard.step++;
          } else {
            await next();
          }
        });
    */

    /*
        // Middleware para recopilar el correo del usuario
        this.bot.use(async (ctx) => {
          console.log('>>>>>> 4 >>> ', ctx.update.update_id, ctx.update.message.location);
          if (ctx.session.wizard.step === 3) {
            ctx.session.wizard.phone = ctx.message.text;
            ctx.reply('Gracias, ahora ingresa tu correo electrónico:');
            ctx.session.wizard.step++;
          } else if (ctx.session.wizard.step === 4) {
            ctx.session.wizard.email = ctx.message.text;
            // Aquí puedes hacer lo que quieras con los datos recopilados
            ctx.reply(`¡Gracias ${ctx.session.wizard.name}! Has proporcionado los siguientes datos:\n\nNombre: ${ctx.session.wizard.name}\nTeléfono: ${ctx.session.wizard.phone}\nCorreo: ${ctx.session.wizard.email}`);
            ctx.session.wizard = {}; // Reiniciar el wizard
          }
        });
    */

    this.bot.use(async (ctx, next) => {
      if (
        ctx.session &&
        ctx.session.wizard &&
        ctx.session.wizard.process &&
        ctx.session.wizard.step
      ) {
        switch (ctx.session.wizard.process) {
          case "register_group":
            this._wizardRegisterGroup(ctx, next);
            break;
          case "register_device":
            this._wizardRegisterDevice(ctx, next);
            break;
          default:
            break;
        }
      }

      await next();
    });
  }

  async _wizardRegisterGroup(ctx, next) {
    switch (ctx.session.wizard.step) {
      case 1:
        ctx.reply("Por favor, ingrese la geolocalización del grupo: ");
        ctx.session.wizard.step++;
        break;
      case 2:
        ctx.session.wizard.geo = ctx.update.message.location;
        console.log(">>>> ctx.update.message.location", ctx.session.wizard.geo);
        if (ctx.session.wizard.geo) {
          ctx.reply(
            `¡Gracias!\nLos datos ingresados para el grupo ${ctx.update.message.chat.title} son:\nLatitude: ${ctx.session.wizard.geo.latitude}\nLongitude: ${ctx.session.wizard.geo.longitude}\n\nDesea registrar el grupo? (si/no)`
          );
        } else {
          ctx.reply(
            `No ingresó la ubicación del grupo.\nDesea registrar el grupo? (si/no)`
          );
        }
        ctx.session.wizard.step++;
        break;
      case 3:
        if (ctx.message.text && ctx.message.text.toUpperCase() == "SI") {
          ctx.reply(
            `¡Gracias!\nUn momento por favor, se está procesando la solicitud...`
          );
          try {
            let data = {
              idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
              group: ctx.update.message.chat.id,
              name: ctx.update.message.chat.title,
              enable: true,
              latitude: ctx.session.wizard.geo.latitude,
              longitude: ctx.session.wizard.geo.longitude,
            };

            let resp = await fetchOCS(OCS_URL_TELEGRAM_GROUPS).post("", data);
            let data_resp = await resp.json();
            console.log("Data registro ", data, data_resp);
            if (data_resp && data_resp.idtg) {
              ctx.reply(
                data_resp.name +
                " se encuentra registrado. ID: " +
                data_resp.idtg
              );
            } else {
              ctx.reply("No se pudo registrar en este momento.");
            }
          } catch (error) {
            console.log(error);
            ctx.reply("Ocurrió un error, no se pudo registrar");
          }
        } else {
          ctx.reply(`¡Gracias!\nSe ha cancelado la solicitud`);
        }

        ctx.session.wizard = {}; // Reiniciar el wizard

        break;
    }
  }

  async _wizardRegisterDevice(ctx, next) {
    switch (ctx.session.wizard.step) {
      case 1:
        ctx.reply("Por favor, ingrese el id de dispositivo: ");
        ctx.session.wizard.step++;
        break;
      case 2:
        ctx.session.wizard.device_id = ctx.message.text;
        ctx.reply("Ahora envíe la ubicación geográfica del dispositivo:");
        ctx.session.wizard.step++;
        break;
      case 3:
        ctx.session.wizard.geo = ctx.message.location;
        // Aquí puedes hacer lo que quieras con los datos recopilados
        ctx.reply(
          "Desea compartir su dispositivo de forma comunitaria? (si/no):"
        );
        ctx.session.wizard.step++;
        break;
      case 4:
        ctx.session.wizard.allow_activation_by_geolocation = ctx.message.text;
        ctx.reply(
          `¡Gracias!\nHa proporcionado los siguientes datos:\n\ndevice_id: ${ctx.session.wizard.device_id}\nLatitud: ${ctx.session.wizard.geo.latitude}\nLongitud: ${ctx.session.wizard.geo.longitude}\nCompartir de forma comunitaria: ${ctx.session.wizard.allow_activation_by_geolocation}\n\nDesea guardar los datos? (si/no)`
        );
        ctx.session.wizard.step++;
        break;
      case 5:
        if (ctx.message.text && ctx.message.text.toUpperCase() == "SI") {
          ctx.reply(
            `¡Gracias!\nUn momento por favor, se está procesando la solicitud...`
          );

          try {
            let data_dev_group = {
              idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
              enable: true,
              device_id: ctx.session.wizard.device_id,
            };
            // Relaciona el dicpositivo con el grupo
            let resp_tgd = await fetchOCS(OCS_URL_TELEGRAM_DEVICES).post(
              "",
              data_dev_group
            );
            let data_resp = await resp_tgd.json();
            console.log(">>> Data registro ", data_dev_group, data_resp);
            if (data_resp && data_resp.idtg) {
              let allow_activation_by_geolocation =
                ctx.session.wizard.allow_activation_by_geolocation.toUpperCase() ==
                  "SI"
                  ? true
                  : false;

              let data_dev = {
                device_id: ctx.session.wizard.device_id,
                idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
                latitude: ctx.session.wizard.geo.latitude,
                longitude: ctx.session.wizard.geo.longitude,
                allow_activation_by_geolocation:
                  allow_activation_by_geolocation,
              };

              let resp_dev = await fetchOCS(OCS_URL_ADMIN_DEVICE).post(
                "",
                data_dev
              );
              data_resp = await resp_dev.json();

              console.log("RESP DEV >>>>>", data_resp);

              ctx.reply(
                "El dispositivo ID: " +
                data_resp.device_id
                +
                " se encuentra registrado en el grupo: " +
                ctx.update.message.chat.title
              );
            } else if (
              data_resp.error &&
              data_resp.error.includes("SQLITE_CONSTRAINT: FOREIGN KEY")
            ) {
              ctx.reply(
                "El ID del dispositivo no fue encontrado.\nAntes de registrar el dispositivo en el grupo debe configurarlo y conectarlo al sistema.\nPuede encontrar más información de como hacerlo en la siguiente dirección: http://google.com"
              );
            } else {
              ctx.reply("No se pudo registrar en este momento.");
            }
          } catch (error) {
            console.log(error);
            ctx.reply("Ocurrió un error, no se pudo registrar");
          }
        } else {
          ctx.reply(`¡Gracias!\nSe ha cancelado la solicitud`);
        }

        ctx.session.wizard = {}; // Reiniciar el wizard

        break;
    }
  }

  /*
  async registerGroup(ctx, next) {
    //TODO: Permitir registrar solo grupos
    ctx.reply("Un momento por favor. Se está registrando el grupo...");
    try {
      console.log(ctx.update.message);

      let data = {
        idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
        group: ctx.update.message.chat.id,
        name: ctx.update.message.chat.title,
      };

      let resp = await fetchOCS(OCS_URL_TELEGRAM_GROUPS).post("", data);
      let data_resp = await resp.json();
      console.log("Data registro ", data, data_resp);
      if (data_resp && data_resp.idtg) {
        ctx.reply(
          data_resp.name + " se encuentra registrado. ID: " + data_resp.idtg
        );
      } else {
        ctx.reply("No se pudo registrar en este momento.");
      }
    } catch (error) {
      console.log(error);
      ctx.reply("Ocurrió un error, no se pudo registrar");
    }
  }
  */

  idGroup(ctx) {
    //console.log('consulta grupo >>> ', ctx.update.message.chat.id);
    ctx.reply(
      "idgroup: " + TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id)
    );
  }

  async registerDevice(ctx) {
    //TODO: Permitir registrar solo grupos
    ctx.reply("Un momento por favor. Se está registrando el dispositivo...");
    try {
      console.log(ctx.update.message);

      let data = {
        idtg: TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id),
        device_id: ctx.update.message.chat.id,
      };

      let resp = await fetchOCS(OCS_URL_TELEGRAM_DEVICES).post("", data);
      let data_resp = await resp.json();
      console.log("Data registro ", data, data_resp);

      if (data_resp && data_resp.idtg) {
        ctx.reply(
          data_resp.name + " se encuentra registrado. ID: " + data_resp.idtg
        );
      } else {
        ctx.reply("No se pudo registrar en este momento.");
      }
    } catch (error) {
      console.log(error);
      ctx.reply("Ocurrió un error, no se pudo registrar");
    }
  }

  // @ts-ignore
  sendEvent(ctx, message, event) {
    let uuid_group = TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id);

    listGroups[uuid_group] = ctx.update.message.chat.id;

    this.emit("event", {
      event: event,
      uuid_group: uuid_group,
    });

    if (message && message.length > 0) {
      ctx.reply(
        `${message} => ${ctx.update.message.from.last_name} ${ctx.update.message.from.first_name}`
      );
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
    console.log("sendMessageToGroup => ", idgroup);
    if (idgroup) {
      try {
        await this.bot.telegram.sendMessage(Number(idgroup), message);
      } catch (error) {
        // @ts-ignore
        console.error(error.message);
      }
    }
  }

  async sendMessageToGroupFromUUID(uuid_group, message) {
    let idgroup;

    try {
      let tg = await tgdb.findAll({
        where: {
          idtg: uuid_group,
        },
      });

      if (tg && Array.isArray(tg) && tg.length > 0) {
        idgroup = tg[0].group;
      }
    } catch (error) {
      console.log(error);
    }

    return await this.sendMessageToGroup(idgroup, message);
  }

  // @ts-ignore
  static getUUIDGroup(idgroup) {
    let c = crypto
      .createHash("md5")
      .update(JSON.stringify(idgroup))
      .digest("hex");
    console.log("MD5 de ", idgroup, JSON.stringify(idgroup), c);
    return c;
  }

  createDeviceToken(deviceId) {
    return jwt.sign({ deviceId: deviceId || crypto.randomUUID() }, JWT_KEY);
  }

  launch() {
    /*
      try {
    
        this.ws_client = new WebSocket(
          `ws://${LOCAL_WS_USERNAME}:${LOCAL_WS_PASSWORD}@localhost:${PORT}${OCS_URL_WS_DEVICE}`
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
  */

    try {
      this.bot.launch();
    } catch (error) {
      console.trace(error);
    }
  }
}
