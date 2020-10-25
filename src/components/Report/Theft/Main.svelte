<script>
    import {SendEvent} from "../SendEvent.js";  
    function Send(params) {
      SendEvent('cspwa-theft-alarm');
    }
  </script>
<button on:click="{Send}" class="button is-danger is-outlined is-large is-fullwidth">HURTO</button>