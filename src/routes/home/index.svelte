<script>
  import { onMount } from "svelte";
  import Report from "../../components/Report/Main.svelte";
  import { FetchData } from "../../components/FetchData.js";

  //  let FData = new FetchData();
  let componentSelected = Report;

  //export let segment;

  onMount(async () => {});
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/home">
      <img src="logo.png" width="25" height="25" alt="Seguridad Comunitaria" /> SEGURIDAD
      CIUDADANA
    </a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a
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

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Mi cuenta </a>

      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Reportes </a>

     
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="button is-light"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="tabs is-boxed">
  <ul>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:selected={componentSelected === Report}
      on:click={(componentSelected = Report)}>
      <a>
        <span class="icon is-small"><i
            class="fas fa-image"
            aria-hidden="true" /></span>
        <span>Reportar</span>
      </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li><a>Notificaciones</a></li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li><a>Seguimiento</a></li>
  </ul>
</div>
<svelte:component this={componentSelected} />
