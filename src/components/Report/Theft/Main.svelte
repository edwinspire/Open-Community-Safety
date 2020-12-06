<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      //SendEvent('cspwa-theft-alarm');
      SendEvent({code: 'cspwa-theft-alarm', description: 'Alarma por botón SOS.'});
    }
  </script>
<button on:click="{Send}" class="button is-danger is-outlined is-large is-fullwidth">HURTO</button>