<script>
  import { onMount } from "svelte";
  import Report from "../../components/Report/Main.svelte";
  import Watched from "../../components/Watched/Main.svelte";
  import Events from "../../components/Events/Main.svelte";
  import Event from "../../components/Event/Main.svelte";
  import MapAccount from "../../components/Map/Map.svelte";
  import { registration } from "../web-push-client.js";
  const sioc = require ('socket.io-client');

  //  let FData = new FetchData();
  let componentSelected = Report;
  let idevent = 0;
  let NavOnLine = false;
  let MenuOpen = false;

  function ToggleClassMenu() {
    console.log("Toogle");
    MenuOpen = !MenuOpen;
  }

  onMount(async () => {

    //var io = sioc();
    ///console.log(io);

    //var hostws = '//'+document.location.host;
		var io = sioc.connect();

		console.log(io);

    io.on('connect', function(){
      console.log('Conectado');
    });
  io.on('event', function(data){
    console.log('WSEvent', data);
  });
  io.on('disconnect', function(){
    console.log('Desconectado');
  });

    NavOnLine = window.navigator.onLine;
    console.log(NavOnLine, navigator);

    await registration();

    window.addEventListener("offline", (event) => {
      //alert("Esta offline");
      NavOnLine = false;
    });

    window.addEventListener("online", (event) => {
      //alert("está online");
      NavOnLine = true;
      
    });
  });



</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/home">
      <span class="icon">
        <img
          src="logo.png"
          width="20"
          height="20"
          alt="Seguridad Comunitaria" />
      </span>

      <strong> SEGURIDAD CIUDADANA</strong>
    </a>
    <span class="navbar-item">
      <span class="icon" class:has-text-success={NavOnLine} class:has-text-danger={!NavOnLine}>
        <i class="fas fa-wifi" />
      </span>
    </span>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class:is-active={MenuOpen}
      on:click={ToggleClassMenu}
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div class="navbar-menu" class:is-active={MenuOpen}>
    <div class="navbar-start">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Mi cuenta </a>

      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Reportes </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" href="/"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="tabs is-boxed">
  <ul>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Report}
      on:click={() => {
        componentSelected = Report;
      }}>
      <a>
        <span class="icon is-small"><i
            class="fa fa-exclamation-triangle"
            aria-hidden="true" /></span>
        <span>SOS</span>
      </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Events}
      on:click={() => {
        componentSelected = Events;
      }}>
      <a>
        <span class="icon is-small"><i
            class="fa fa-list-alt"
            aria-hidden="true" /></span>
        <span>Eventos</span>
      </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Watched}
      on:click={() => {
        componentSelected = Event;
      }}>
      <a>Evento</a>
    </li>
    <li
      class:is-active={componentSelected === MapAccount}
      on:click={() => {
        componentSelected = MapAccount;
      }}>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a>Mapa</a>
    </li>
  </ul>
</div>
<svelte:component
  this={componentSelected}
  IdEvent={idevent}
  on:event_selected={(e) => {
    idevent = e.detail.idevent;
    console.log('Event master: ', idevent);
    componentSelected = Event;
  }} />
