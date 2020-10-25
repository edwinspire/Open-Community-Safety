<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      SendEvent('cspwa-assault-alarm');
    }
  </script>

<button on:click="{Send}" class="button is-danger is-outlined is-large is-fullwidth">ASALTO</button>