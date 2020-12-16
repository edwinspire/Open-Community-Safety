/*
import { FetchData } from "../FetchData.js";
import { Geolocation } from "../Geolocation.js";

let FData = new FetchData();
let GL = new Geolocation();
*/

/*
export function SendEvent(data_event) {
  Send(data_event);
}
*/
/*
async function Send(data_event, glocation) {
  let position = await GL.getCurrentPosition();
  let dataUser = { data_event: data_event, details: position };
  console.log(dataUser);

  let EventsOfflineTxt = localStorage.getItem("offline_sendevents") | "[]";
  let EventsOffline = JSON.parse(EventsOfflineTxt);

  console.log(EventsOfflineTxt, EventsOffline);

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
      EventsOffline.push(dataUser);
      localStorage.setItem("offline_sendevents", JSON.stringify(EventsOffline));
    }
  } catch (err) {
    console.warn(err);
    EventsOffline.push(dataUser);
    localStorage.setItem("offline_sendevents", JSON.stringify(EventsOffline));
  }
}
*/
