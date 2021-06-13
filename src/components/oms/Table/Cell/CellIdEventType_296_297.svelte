<script>
  export let value;

</script>

{#if value && value.length > 0}
<details>
  <summary><b>{value.length}</b> Novedades</summary>
  <hr class="separator" />

  <table class="table">
    <tr>
      <th class="has-text-info-dark">Num Transac</th>
      <th class="has-text-info-dark">Id Cliente</th>
    </tr>
    {#each value as { cac_num_transcanc, cac_numero_idcliente }, i}
      <tr>
        <td>{cac_num_transcanc}</td>
        <td>{cac_numero_idcliente}</td>
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
