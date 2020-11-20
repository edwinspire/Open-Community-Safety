<script>
  import Accident from "./Accident/Main.svelte";
  import Assault from "./Assault/Main.svelte";
  import Suspect from "./Suspect/Main.svelte";
  import Theft from "./Theft/Main.svelte";
</script>

<div class="columns">
  <div class="column">
    <Assault />
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

<div class="container">
  <div class="notification is-primary">
    Presionar un botón de la parte superior emitirá <strong>inmediatamente</strong>  una alerta a todos los usuarios cercanos.
  </div>    
</div>
