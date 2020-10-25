<script>
  import { onMount } from "svelte";
  import { FetchData } from "../../components/FetchData.js";

  let Params = { geox: 0, geoy: 0, country: "default", firstname: '', lastname: ''};
  let FData = new FetchData();
  let ReturnRegister = {idaccountuser: 0};

  function Country() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        Params.geox = position.coords.latitude;
        Params.geoy = position.coords.longitude;
        GetCountry();
      });
    } else {
      console.log("No se pudo obtener las coordenadas");
    }
  }

  async function Register() {
    console.log("Registro.");
    try {
      const res = await FData.post(
        "/pgapi/v2/register/community-safety-pwa",
        Params,
        {
          "Content-Type": "application/json",
        }
      );

      if (res.ok) {
        ReturnRegister = await res.json();
        console.log(ReturnRegister);
      }
    } catch (error) {
      ReturnRegister = {};
      console.log(error);
    }
  }

  async function GetCountry() {
    //data=[timeout:10][out:json];is_in(-0.21263,-78.41053)->.a;way(pivot.a);out+tags+bb;out+ids+geom(-0.21803,-78.41111,-0.21141,-78.40560);relation(pivot.a);out+tags+bb;
    let query = `[out:json][timeout:10];is_in(${Params.geox},${Params.geoy})->.a;relation(pivot.a);out tags qt;(way(around:20,${Params.geox},${Params.geoy}););out tags qt;`;
    let r = await fetch("https://overpass-api.de/api/interpreter", {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: `https://www.openstreetmap.org/query?lat=${Params.geox}&lon=${Params.geoy}`,
      referrerPolicy: "no-referrer-when-downgrade",
      //"body": `data=%5Btimeout%3A10%5D%5Bout%3Ajson%5D%3Bis_in(${this.Params.geox}%2C${this.Params.geoy})-%3E.a%3Bway(pivot.a)%3Bout+tags+bb%3Bout+ids+geom(${Number(this.Params.geox).toFixed(5)}%2C${Number(this.Params.geoy).toFixed(5)}%2C${this.Params.geox}%2C${this.Params.geoy})%3Brelation(pivot.a)%3Bout+tags+bb%3B`,
      body: query,
      method: "POST",
      mode: "cors",
    });
    let data = await r.json();

    if (Array.isArray(data.elements) && data.elements.length > 0) {
      if (
        data.elements[0] &&
        data.elements[0].tags &&
        data.elements[0].tags.name
      ) {
        Params.country = data.elements[0].tags.name;
      }
    }
  }

  onMount(() => {
    console.log("Inicia");
    Country();
  });
</script>

<style>



  @font-face {
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 200;
    src: local("Source Sans Pro ExtraLight"), local("SourceSansPro-ExtraLight"),
      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf)
        format("truetype");
  }
  @font-face {
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 300;
    src: local("Source Sans Pro Light"), local("SourceSansPro-Light"),
      url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf)
        format("truetype");
  }
  .root {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
    display: block;
  }
  .body {
    font-family: "Source Sans Pro", sans-serif;
    color: white;
    font-weight: 300;
  }
  .body ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: "Source Sans Pro", sans-serif;
    color: white;
    font-weight: 300;
  }
  .body :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: "Source Sans Pro", sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
  }
  .body ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: "Source Sans Pro", sans-serif;
    color: white;
    opacity: 1;
    font-weight: 300;
  }
  .body :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-family: "Source Sans Pro", sans-serif;
    color: white;
    font-weight: 300;
  }
  .wrapper {
    background: #4877af;
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#4877af),
      to(#12284a)
    );
    background: linear-gradient(to bottom right, #4877af 0%, #12284a 100%);
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .wrapper.form-success .container h1 {
    -webkit-transform: translateY(85px) !important;
    transform: translateY(85px) !important;
  }
  .container {
    max-width: 300px;
    margin: 0 auto;
    padding: 80px 0;
    height: 400px;
    text-align: center;
  }
  .container h1 {
    font-size: 40px !important;
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    -webkit-transition-timing-function: ease-in-put;
    transition-timing-function: ease-in-put;
    font-weight: 200 !important;
  }
  .form {
    padding: 20px 0;
    z-index: 99;
    position: relative;
  }

  .links_block {
    text-align: right;
    padding: 1em;
  }

  .form a {
    color: white;
  }
  .form a:visited {
    color: floralwhite;
  }
  .form input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: -webkit-fill-available !important;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 1em !important;
    color: white;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
    font-weight: 300 !important;
  }
  .form input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  .form input:focus {
    background-color: white;
    width: 300px;
    color: #12284a;
  }

  .bg_bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .bg_bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  .bg_bubbles li:nth-child(1) {
    left: 10%;
  }
  .bg_bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 17s;
    animation-duration: 17s;
  }
  .bg_bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }
  .bg_bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    -webkit-animation-duration: 22s;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
  }
  .bg_bubbles li:nth-child(5) {
    left: 70%;
  }
  .bg_bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .bg_bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
  }
  .bg_bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
  }
  .bg_bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .bg_bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 11s;
    animation-delay: 11s;
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-330vh) rotate(600deg);
      transform: translateY(-330vh) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-330vh) rotate(600deg);
      transform: translateY(-330vh) rotate(600deg);
    }
  }
</style>

<div class="root">
  <div class="body">
    <div class="wrapper">
      <div class="container">
        <h1>Registro</h1>

        {#if ReturnRegister.idaccountuser <= 0}
        <div >
          <form
          class="form"
          action="/pgapi/v2/register"
          method="post"
          on:submit|preventDefault={Register}>
          <input
            name="geox"
            type="hidden"
            placeholder="Geox"
            bind:value={Params.geox} />
          <input
            name="geoy"
            type="hidden"
            placeholder="Geoy"
            bind:value={Params.geoy} />
          <input
            name="country"
            type="text"
            readonly
            placeholder="Country"
            bind:value={Params.country} />
          <input
            name="firstname"
            type="hidden"
            placeholder="Nombre"
            bind:value={Params.firstname}
            required="required" />
          <input
            name="lastname"
            type="hidden"
            placeholder="Apellido"
            bind:value={Params.lastname}
            required="required" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            bind:value={Params.email}
            required="required" />
          <input
            name="pwd"
            type="password"
            placeholder="Contraseña"
            bind:value={Params.pwd}
            required="required" />
          <input
            name="pwd2"
            type="password"
            placeholder="Confirme Contraseña"
            required="required" />
          <input name="register" type="submit" value="Aceptar" />
          <div class="links_block"><a href="/">Login</a></div>
        </form>
        
        </div>

        {:else}
<h2>
  {ReturnRegister.message}
</h2>
        {/if }
          



      </div>
    </div>
  </div>
  <ul class="bg_bubbles">
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
  </ul>
</div>
