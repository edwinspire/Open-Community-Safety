<script>
  import Accident from "./Accident/Main.svelte";
  import Robbery from "./Robbery/Main.svelte";
  import Suspect from "./Suspect/Main.svelte";
  import Theft from "./Theft/Main.svelte";
</script>

<div class="columns">
  <div class="column">
    <Robbery />
  </div>
  <div class="column">
    <Theft />
  </div>
  <div class="column">
    <Accident />
  </div>
  <div class="column">
    <Suspect />
  </div>
</div>
