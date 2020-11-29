<script>
  import { FetchData } from "../FetchData.js";
  //import MModal from "../ModalMessage.svelte";
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  
  let idevent = 0;
  let FData = new FetchData();
  let promise = new Promise(
    () => {},
    () => {}
  );

  async function GetEvent() {
    let query = { idevent: idevent };
    const res = await FData.get("/pgapi/v2/event", query, {
      "Content-Type": "application/json",
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("No se pudo cargar la información");
    }
  }

  onMount(() => {
    promise = GetEvent();
  });

</script>

<style>
  
  .mapevent {
    height: 30vh;
    width: 100%;
  }
  .title {
    font-style: italic;
    font-weight: bold;
  }
  
</style>

<div>
  {#await promise}
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="control is-loading">
      Cargando
    </div>
  {:then datas}
    {#each datas as { idevent, label, dateevent, meters, description, num_comments, details }}
      <div class="mapevent">
        <WMap
          points={[{ geolocation: [details.geo.longitude, details.geo.latitude] }]} />
      </div>
      <div class="title">
        {label}
        {new Date(dateevent).toLocaleDateString()}
        {new Date(dateevent).toLocaleTimeString()}
      </div>

      <hr />
      <div>
        <div>Comentarios 99</div>
        <div><input type="text" value="Comentarios" /></div>

        <div>
          <div>Usuario XXX * 2020-01-01 12:00:12</div>
          Ví que el sospechoso se dirige por la avenida 14 de julio camino a la
          perimetral.
        </div>
      </div>

     
    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
