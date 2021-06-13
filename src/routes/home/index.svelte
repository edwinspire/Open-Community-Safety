<script context="module">
  var { CheckSession } = require("@edwinspire/svelt-session/Preload");
  export function preload(page, session) {
    return CheckSession(this, page, session, "/");
  }
</script>

<script>
  import { onMount } from "svelte/internal";
  import Menu from "../../components/edwinspire/Menu";
  import TablaUltimosEventos from "../../components/oms/TableEvents.svelte";
  //-- Este bloque sirve para 
  import { CurrentSession } from "@edwinspire/svelt-session/Store";
  export let session;
  //export let page;
  CurrentSession.set(session);

  onMount(async () => {});
</script>

<Menu />
<TablaUltimosEventos></TablaUltimosEventos>