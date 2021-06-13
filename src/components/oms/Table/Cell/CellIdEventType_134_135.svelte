<script>
  export let value;

  let mensaje = "";

  $: value, CambiaMensaje();

  function CambiaMensaje() {
    mensaje = "Sin Novedades";
    value.every((data) => {
      if (data.estado === "Revisar") {
        mensaje = "URGENTE REVISAR!";
        return true;
      } else {
        return false;
      }
    });
  }
</script>

{#if value && value.length > 0}
  <details>
    <summary><b>{mensaje}</b></summary>
    <hr class="separator" />

    <table class="table">
      <tr>
        <th class="has-text-info-dark">Proceso</th>
        <th class="has-text-info-dark">Fecha</th>
        <th class="has-text-info-dark">Serie</th>
        <th class="has-text-info-dark">Estado</th>
      </tr>
      {#each value as { concepto, serie, fecha, minutos, estado }, i}
        <tr>
          <td>{concepto}</td>
          <td>{fecha}</td>
          <td>{serie}</td>
          {#if estado === "Revisar"}
            <td><b>{estado}</b></td>
          {:else}
            <td>{estado}</td>
          {/if}
        </tr>
      {/each}
    </table>
  </details>
{:else}
  <div>No hay datos que mostrar, revise en ScheduledTask</div>
{/if}

<style>
  .table {
    width: 100%;
  }
  .separator {
    margin: 0.5rem;
  }
</style>
