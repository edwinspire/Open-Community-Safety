<script>
  import { onMount } from "svelte";

  onMount(() => {});
</script>

<div class="imgMargin">
  <img class="imgwww" src="img/world-wide-web.svg" alt="Online" />
</div>
<div class="imgMargin">
<h2 class="subtitle">Powered by</h2>
  <div class="columns">
    <div class="column">
      <img class="logo " src="img/postgresql-horizontal.svg" alt="PostgreSQL" />
    </div>
    <div class="column">
      <img class="logo " src="img/nodejs.svg" alt="NodeJS" />
    </div>
    <div class="column">
      <img class="logo " src="img/expressjs.svg" alt="ExpressJS" />
    </div>
    <div class="column">
      <img class="logo " src="img/svelte-logo-horizontal.svg" alt="Svelte" />
    </div>
  </div>

</div>

<style>
  .imgwww {
    height: 200px;
    padding: 1em;
  }
  .logo {
    height: 75px;
    padding: 1em;
  }
  .imgMargin {
    margin: auto;
    text-align: center;
  }
</style>
