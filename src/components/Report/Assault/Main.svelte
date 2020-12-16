<script>
  import { Events } from "../../Comunications.js";

  function Send(params) {
    let Ev = new Events();
    Ev.Send({
      code: "cspwa-assault-alarm",
      description: "Alarma por botón SOS.",
    });
  }
</script>

<button
  on:click={Send}
  class="button is-danger is-outlined is-large is-fullwidth">ASALTO</button>
