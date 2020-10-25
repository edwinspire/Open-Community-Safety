import { FetchData } from "../FetchData.js";

let FData = new FetchData();

export function SendEvent(code) {
  if ("geolocation" in navigator) {
    console.log("Obtiene localización");
    navigator.geolocation.getCurrentPosition(
       (position) => {
        //console.log(position);
         Send(code, position);
      },
       (err) => {
        console.log(err);
         Send(code, err);
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("GeoLocalización no soportada");
    Send(code, { location: "unsoported" });
  }
}

async function Send(code, glocation) {
  let geo = {
    latitude: glocation.coords.latitude,
    longitude: glocation.coords.longitude,
    accuracy: glocation.coords.accuracy,
    altitude: glocation.coords.altitude,
    altitudeAccuracy: glocation.coords.altitudeAccuracy,
    heading: glocation.coords.heading,
    speed: glocation.coords.speed
  };
  let dataUser = { code: code, details: { geo: geo} };
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
    }
  } catch (err) {
    console.warn(err);
  }
}
