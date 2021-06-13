<script>
  export let value;

  let Total = -1;

  function CalculaTotal() {
    Total = 0;
    if (value && value.length > 0) {
      value.forEach((element) => {
        Total = Total + element.Documentos;
      });
    }
  }

  $: value, CalculaTotal();
</script>

{#if value && value.length > 0}
  <details>
    <summary><b>{Total}</b> documentos</summary>
    <hr class="separator" />

    <table class="table">
      <tr>
        <th class="has-text-info-dark">Fecha</th>
        <th class="has-text-info-dark">Documentos</th>
        <th class="has-text-info-dark">Tipo_Documento</th>
      </tr>
      {#each value as { Fecha, Documentos, Tipo_Documento }, i}
        <tr>
          <td>{Fecha}</td>
          <td>{Documentos}</td>
          <td>{Tipo_Documento}</td>
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
