<script>
  export let value;

  let Total = -1;

  function CalculaTotal() {
    Total = 0;
    if (value && value.length > 0) {
      value.forEach((element) => {
        Total = Total + element.cantidad;
      });
    }
  }

  $: value, CalculaTotal();
</script>

{#if value && value.length > 0}
  <details>
    <summary>
      <b>{value.length}</b> Corporativos - <b>{Total}</b> Colaboradores</summary
    >
    <hr class="separator" />
    <table class="table">
      <tr>
        <th class="has-text-info-dark">Corporativo</th>
        <th class="has-text-info-dark">Cantidad</th>
      </tr>
      {#each value as { rco_numero_id_grupo, cantidad }, i}
        <tr>
          <td>{rco_numero_id_grupo}</td>
          <td>{cantidad}</td>
        </tr>
      {/each}
    </table>
  </details>
{:else}
  <div>Sin novedades</div>
{/if}

<style>
  .table {
    width: 100%;
  }
  .separator {
    margin: 0.5rem;
  }
</style>
