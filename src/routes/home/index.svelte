<script>
  import { onMount } from "svelte";
  import Report from "../../components/Report/Main.svelte";
  import Watched from "../../components/Watched/Main.svelte";
  import Events from "../../components/Events/Main.svelte";
  import MapAccount from "../../components/Map/Map.svelte";
  import { subscription } from "../web-push-client.js";


//  let FData = new FetchData();
  let componentSelected = Report;

  let MenuOpen = false;

  function ToggleClassMenu() {
    console.log("Toogle");
    MenuOpen = !MenuOpen;
  }




  onMount(async  () => {

    //await registration();
    await subscription();
    /*
    try {
      const {webpush} = await import ("../web-push-client.js");
    webpush();
    } catch (error) {
      console.log(error);
    }
*/

  });
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/home">
      <img src="logo.png" width="25" height="25" alt="Seguridad Comunitaria" />
      <strong> SEGURIDAD CIUDADANA</strong>
    </a>

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
        <span>Urgente</span>
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
        componentSelected = Watched;
      }}>
      <a>Seguimiento</a>
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
<svelte:component this={componentSelected} />
