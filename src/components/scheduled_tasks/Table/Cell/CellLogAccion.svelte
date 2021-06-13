<script>
  import { FetchData } from "@edwinspire/fetch/FetchData";
  export let value;
  export let row;

  let FData = new FetchData();
  let CorriendoAccion = false;

  async function Reprocesar_pa_CambiarEstadoFactReserv() {
    CorriendoAccion = true;
    var arr = row.lsp_respuesta.match(/exec (.*)/g);
    console.log(arr);

    if (arr.length > 0) {
      try {
        let Response = await FData.get(
          "/pgapi/farma/exec_pa_cambiar_estado_factReserv",
          {
            procedimiento: arr[0],
            lsp_id: row.lsp_id,
          }
        );
        let respuesta = await Response.json();
        console.log(respuesta);

        setTimeout(() => {
          CorriendoAccion = false;
          console.log('Se habilita');
        }, 30*1000);
        
      } catch (error) {
        console.error(error);
        CorriendoAccion = false;
      }
    }
  }
</script>

<td class=" has-text-centered" on:click>
  {#if row.lsp_respuesta && row.lsp_respuesta.includes("Error: al ejecutar procedimiento almacenado") && row.lsp_respuesta.includes("pa_CambiarEstadoFactReserv") && !row.lsp_revision.includes("OK")}
    <div>
      <button
        disabled={CorriendoAccion}
        class="button is-small"
        on:click={Reprocesar_pa_CambiarEstadoFactReserv}
      >
        <span class="icon is-small">
          <i class="fas fa-cogs" />
        </span>
        <span>Reprocesar</span>
      </button>
    </div>
  {:else}
    {value}
  {/if}
</td>

<style>
</style>
