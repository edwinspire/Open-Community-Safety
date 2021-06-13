<script>
  export let value;
</script>

{#if value && value.time}
  <span class="icon  has-text-success  fa-lg">
    <i class="fas fa-clock"></i>
  </span>
  <span>{value.time} ms</span>
{:else}
  <span class="icon  has-text-danger  fa-lg">
    <i class="fas fa-unlink" />
  </span>
  <span>Sin respuesta</span>
{/if}

<style>
</style>
