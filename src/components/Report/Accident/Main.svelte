
<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      SendEvent({code: 'cspwa-accident-alarm', description: 'Alarma por botón SOS.'});
    }
  </script>
<button on:click="{Send}" class="button is-warning is-outlined is-large is-fullwidth">ACCIDENTE</button>