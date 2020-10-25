
<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      SendEvent('cspwa-accident-alarm');
    }
  </script>
<button on:click="{Send}" class="button is-warning is-outlined is-large is-fullwidth">ACCIDENTE</button>