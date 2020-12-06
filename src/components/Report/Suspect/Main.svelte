<script>
  import {SendEvent} from "../SendEvent.js";  
  function Send(params) {
    //SendEvent('cspwa-suspect-alarm');
    SendEvent({code: 'cspwa-suspect-alarm', description: 'Alarma por botón SOS.'});

  }
</script>

<button
  class="button is-link is-outlined is-large is-fullwidth"
  on:click={Send}>SOSPECHOSO</button>
