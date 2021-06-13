<script context="module">
    var { CheckSession } = require("@edwinspire/svelt-session/Preload");
    export function preload(page, session) {
      return CheckSession(this, page, session, "/");
    }
  </script>
  

<script>
    //import { onMount } from "svelte";
//    import Session from "../../components/edwinspire/Session/Required.svelte";
    import EndPoint from '../../components/edwinspire/pgAPI/Endpoints/EndPoints.svelte';
    </script>

  <h1>Asistente</h1>
  <EndPoint></EndPoint>


  