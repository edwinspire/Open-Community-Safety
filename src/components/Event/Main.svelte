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

  async function GetEventsAround(search) {
    let query = { latitude: GeoLatitude, longitude: GeoLongitude };
    const res = await FData.get("/pgapi/v2/events/around", query, {
      "Content-Type": "application/json",
    });

    if (res.ok) {
      return res.json();
      console.log(datas);
    } else {
      throw new Error("No se pudo cargar la información");
    }
  }
</script>

<style>
  .event {
    padding: 0.5em;
    margin: 0.2em;
    -webkit-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
  }
  .mapevent {
    height: 30vh;
    width: 100%;
  }
  .title {
    font-style: italic;
    font-weight: bold;
  }
  .event_text {
    min-height: 100px;
  }
</style>

<div>
  {#await promise}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="is-loading">Cargando...</a>
  {:then datas}
    {#each datas as { idevent, label, dateevent, meters, description, num_comments, details }, i}
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
