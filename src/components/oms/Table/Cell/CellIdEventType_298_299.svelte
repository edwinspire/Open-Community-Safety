<script>
  export let value;
</script>

{#if value && value.length > 0}
<details>
  <summary><b>{value.length}</b> colaboradores</summary>
  <hr class="separator" />

  <table class="table">
    <tr>
      <th class="has-text-info-dark">numero_idcliente</th>
    </tr>
    {#each value as { numero_idcliente }, i}
      <tr>
        <td>{numero_idcliente}</td>
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
