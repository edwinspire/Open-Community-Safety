<script context="module">
  var { CheckSession } = require("@edwinspire/svelt-session/Preload");
  export function preload(page, session) {
    return CheckSession(this, page, session, "/");
  }
</script>

<script>
  import { onMount } from "svelte/internal";
  import Menu from "../../../../components/edwinspire/Menu";
  import Tabla from "../../../../components/scheduled_tasks/Table/TableScheduledTasks.svelte";
  import { CurrentSession } from "@edwinspire/svelt-session/Store";
  export let session;
  CurrentSession.set(session);

  onMount(async () => {});
</script>

<Menu />

<Tabla />
