<script>
  export let value;

  let Total = -1;

  function CalculaTotal() {
    Total = value.length;
  }

  $: value, CalculaTotal();
</script>

{#if value && value.length > 0}
  <details>
    <summary>
      <b>{value.length}</b> Corporativos</summary
    >
    <hr class="separator" />
    <table class="table">
      <tr>
        <th class="has-text-info-dark">Cod_sap</th>
        <th class="has-text-info-dark">Tipo_Identificacion</th>
        <th class="has-text-info-dark">Identificacion</th>
        <th class="has-text-info-dark">Nombre</th>
      </tr>
      {#each value as { Cod_sap, Tipo_Identificacion, Identificacion, Nombre }, i}
        <tr>
          <td>{Cod_sap}</td>
          <td>{Tipo_Identificacion}</td>
          <td>{Identificacion}</td>
          <td>{Nombre}</td>
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
