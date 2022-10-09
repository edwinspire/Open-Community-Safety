// @ts-nocheck
const { BOT_TOKEN, MQTT_BROKER, MQTT_PORT, MQTT_ROOT_TOPIC } = process.env;
import crypto from "crypto";
console.log('BOT_TOKEN: ', BOT_TOKEN);
import * as mqtt from "mqtt"
import { EventEmitter } from 'events';

import { Telegraf, Markup } from "telegraf";
const textEmergency = "🚨 EMERGENCIA";
const textwarning = "⚠ ADVERTENCIA";
const textTest = "🔈 PRUEBA";
const textTurnoff = "🔇 APAGAR";
const DBJson = {
    'OCS67132552b5dab95485801a7a42826ae8': {
        id_group: -738598095,
        devices: [
            { id_device: 'OCS_3D59F8' },
            { id_device: 'OCS_E34AB1' }
        ]
    }
};

//@ts-ignore

export class TelegrafOCS extends EventEmitter {
    constructor() {
        super()

        //   this.FDataNode = new FetchDataNode();
        this.mqtt_client = undefined;
        // @ts-ignore
        this.bot = new Telegraf(BOT_TOKEN);

        /*
        this.bot.on('message', (ctx) => {
            console.log('message bot >>> ', ctx.message.from.first_name);        
        })
        */

        this.bot.command('getid', (ctx) => {
            //console.log('consulta grupo >>> ', ctx.update.message.chat.id);
            ctx.reply('idgroup: ' + TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id))
        });


        this.bot.command('register', async (ctx) => {
            ctx.reply('Un momento por favor. Se está registrando el grupo...');
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
                console.log(error);
                ctx.reply("Ocurrió un error, no se pudo registrar");
            }
        });


        this.bot.command("/start", ctx => {
            return ctx.reply(
                "Seleccione una opción",
                Markup.keyboard([
                    // @ts-ignore
                    [textEmergency],
                    // @ts-ignore
                    [textwarning],
                    // @ts-ignore
                    [textTest, textTurnoff]
                ])
                    .oneTime()
                    .resize()
                ,
            );
        });

        this.bot.hears(textEmergency, async (ctx) => {
            this.cmndPublish(ctx, 'POWER', 'ON', 'ALARMA');
            setTimeout(() => {
                //clearInterval(interval);
                this.cmndPublish(ctx, 'POWER', 'OFF');
            }, 60000);

            /*
            let message = "";
            try {
                let reevent = await TelegrafOCS.SendEvent(ctx, 'EOCSA100');
                //message = reevent.message;
                // @ts-ignore
                message = 'Recibida solicitud ' + reevent.idevent;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
            }
            ctx.reply(message);
            */
        })
        this.bot.hears(textwarning, (ctx) => {
            this.cmndPublish(ctx, 'POWER', 'ON', 'ALERTA');
            setTimeout(() => {
                //clearInterval(interval);
                this.cmndPublish(ctx, 'POWER', 'OFF');
            }, 10000);
            /*
            let message = "";
            try {
                let reevent = await TelegrafOCS.SendEvent(ctx, 'EOCSA102');
                // @ts-ignore
                message = reevent.message;
            } catch (error) {
                message = 'Ocurrió un error: ' + JSON.stringify(error)
            }
            ctx.reply(message);
            */
        })

        this.bot.hears(textTest, (ctx) => {
            console.log(textTest);
            this.cmndPublish(ctx, 'POWER', 'ON', 'PRUEBA');

            /*
            let interval = setInterval(() => {
                this.cmndPublish(ctx, 'POWER', 'TOGGLE');
            }, 1000);
            */

            setTimeout(() => {
                //clearInterval(interval);
                this.cmndPublish(ctx, 'POWER', 'OFF');
            }, 3000);

        })
        this.bot.hears(textTurnoff, (ctx) => {
            console.log(ctx.update.message);
            this.cmndPublish(ctx, 'POWER', 'OFF', 'APAGA ALARMA');

        });


    }

    // @ts-ignore
    cmndPublish(ctx, last_level_topic, payload, msg_reply) {

        this.publishToDevices(TelegrafOCS.getUUIDGroup(ctx.update.message.chat.id), last_level_topic, payload);

        if (msg_reply && msg_reply.length > 0) {
            ctx.reply(ctx.update.message.from.last_name + ' ' + ctx.update.message.from.first_name + ' ' + msg_reply);
        }


    }

    publishToDevices(uuid_group, last_level_topic, payload) {
        let dataGroup = DBJson[uuid_group];
        console.log(dataGroup);

        if (dataGroup) {

            if (dataGroup.devices && dataGroup.devices.length > 0) {

                if (this.mqtt_client) {
                    dataGroup.devices.forEach(dev => {
                        let topic = `cmnd/${MQTT_ROOT_TOPIC}/${uuid_group}/${dev.id_device}/${last_level_topic}`;
                        this.mqtt_client.publish(topic, payload, {}, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                } else {
                    console.error('this.mqtt_client no se ha inicializado');
                }

            } else {
                this.sendMessageToGroup(dataGroup.idgroup, 'No hay dispositivos asociados a este grupo.');
            }
        }
        return dataGroup;
    }

    async sendMessageToGroup(idgroup, message) {
        try {
            await this.bot.telegram.sendMessage(Number(idgroup), message);
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    // @ts-ignore
    static getUUIDGroup(idgroup) {
        let c = crypto
            .createHash("md5")
            .update(JSON.stringify(idgroup))
            .digest("hex");
        console.log('MD5 de ', idgroup, JSON.stringify(idgroup), c);
        return 'OCS' + c;
    }

    static topic_levels(fulltopic) {
        let [prefix, environment, uuid_group, id_device, last_level_topic] = fulltopic.split('/');
        //console.log(prefix, environment);
        return { prefix, environment, uuid_group, id_device, last_level_topic };
    }

    launch() {
        //CreateSocketIONameSpace(socketioInstance)
        this.mqtt_client = mqtt.connect({ port: MQTT_PORT, host: MQTT_BROKER, keepalive: 10000 });

        this.mqtt_client.on('connect', () => {

            this.mqtt_client.subscribe('stat/' + MQTT_ROOT_TOPIC + '/#', function (err) {
                if (!err) {
                    //client.publish('presence', 'Hello mqtt')
                    console.log('Se ha conectado');
                }
            });


            this.mqtt_client.on('message', (topic, message, pkg) => {
                // message is Buffer
                console.log(TelegrafOCS.topic_levels(topic));
                console.log(topic, message.toString());
                //this.sendMessageToGroup('-738598095', 'Prueba a grupo por id');
                //client.end()
            })

        })


        this.bot.launch();
    }






}


/*
/////////////////////////////////
bot.command('/start', ({ reply }) => {
    return reply('Seleccione una opción', Markup
        .keyboard([
            ['EMERGENCIA'],
            ['ADVERTENCIA'],
            ['PROBAR', 'APAGAR']
        ])
        .oneTime()
        .resize()
        .extra()
    )
})

bot.hears('EMERGENCIA', ctx => ctx.reply('Alarma de emergencia!'))
bot.hears('ADVERTENCIA', ctx => ctx.reply('Alarma de adventencia!'))
bot.hears('PROBAR', ctx => ctx.reply('Prueba de dispositivos'))
bot.hears('APAGAR', ctx => ctx.reply('Apagar alarma'))





bot.command('alarmas', (ctx) => {

    console.dir('alarmas >>> ', ctx.update.message.chat);

    if (ctx.update.message.chat.type == "private") {

        return ctx.reply('Botones especiales', Extra.markup((markup) => {
            return markup.resize()
                .keyboard([
                    markup.contactRequestButton('Enviar contacto'),
                    markup.locationRequestButton('Activar Alarma')
                ])
        }))
    } else {
        ctx.telegram.sendMessage(ctx.message.chat.id, `Opción habilitada solo en chats privados`)
    }

})


bot.command('dispositivos', (ctx) => {

    console.dir('dispositivos >>> ', ctx.update);

    ctx.telegram.sendMessage(ctx.message.chat.id,
        `/ListarDispositivo: Listar dispositivos
/AgregarDispositivo : Agrega
/EliminarDispositivo : Elimina
`
    )


})




bot.on('message', (ctx) => {
    console.log('message >>> ', ctx.message);


    if (ctx.message.new_chat_members && ctx.message.new_chat_members.length > 0) {


        ctx.message.new_chat_members.forEach(element => {
            console.log(element);

            if (element.is_bot) {

                ctx.telegram.sendMessage(ctx.message.from.id, ' Has registrado un nuevo bot en el Grupo ');
                ctx.telegram.sendMessage(ctx.message.chat.id, ` ${ctx.message.from.username} ha registrado un nuevo bot en el Grupo `);
                ctx.telegram.sendMessage(element.id, '/id');

            }

        });

    }


})
*/
