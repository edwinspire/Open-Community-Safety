<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      //SendEvent('cspwa-assault-alarm');
      SendEvent({code: 'cspwa-assault-alarm', description: 'Alarma por botón SOS.'});
    }
  </script>

<button on:click="{Send}" class="button is-danger is-outlined is-large is-fullwidth">ASALTO</button>