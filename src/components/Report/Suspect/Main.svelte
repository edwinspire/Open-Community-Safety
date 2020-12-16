<script>
  import { Events } from "../../Comunications.js";

  function Send(params) {
    let Ev = new Events();
    Ev.Send({
      code: "cspwa-suspect-alarm",
      description: "Alarma por botón SOS.",
    });
  }
</script>

<button
  class="button is-link is-outlined is-large is-fullwidth"
  on:click={Send}>SOSPECHOSO</button>
