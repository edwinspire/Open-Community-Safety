import { FetchData } from "./FetchData.js";
import { Geolocation } from "./Geolocation.js";

let FData = new FetchData();
let GL = new Geolocation();

export class Events {
  constructor() {
    window.addEventListener("online", (event) => {
      // Verifica si hay eventos Pendientes de Enviar
      console.log("Eventos Offline por enviar", this.ListOffline());
      this.ListOffline().forEach(async (ev) => {
        await this.Send(ev);
      });
    });
  }

  ListOffline() {
    let EventsOfflineTxt = localStorage.getItem("offline_sendevents") | "[]";
    return JSON.parse(EventsOfflineTxt);
  }

  offline(ev) {
    let l = this.ListOffline();
    l.push(ev);
    localStorage.setItem("offline_sendevents", JSON.stringify(l));
  }

  async Send(data_event) {
    let position = await GL.getCurrentPosition();
    let dataUser = { data_event: data_event, details: position };
    console.log(dataUser);
    try {
      const res = await FData.post(
        "/pgapi/community-safety-pwa/v1/receiver",
        dataUser,
        {
          "Content-Type": "application/json",
        }
      );

      if (res.ok) {
        let data = await res.json();
        console.warn(data);
      } else {
        console.error(res);
        offline(dataUser);
      }
    } catch (err) {
      console.warn(err);
      offline(dataUser);
    }
  }
}
