<script>
  import {SendEvent} from "../SendEvent.js";  
  function Send(params) {
    SendEvent('cspwa-suspect-alarm');
  }
</script>

<button
  class="button is-link is-outlined is-large is-fullwidth"
  on:click={Send}>SOSPECHOSO</button>
