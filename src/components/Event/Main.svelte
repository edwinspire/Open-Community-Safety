<script>
  import { FetchData } from "../FetchData.js";
  //import MModal from "../ModalMessage.svelte";
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let IdEvent = -1;
  let FData = new FetchData();
  let promise = new Promise(
    () => {},
    () => {}
  );

  let GeoLatitude = 0;
  let GeoLongitude = 0;

  function GeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        GeoLatitude = position.coords.latitude;
        GeoLongitude = position.coords.longitude;
        promise = GetEvent();
      });
    } else {
      console.log("No se pudo obtener las coordenadas");
    }
  }

  async function GetEvent() {
    let query = { idevent: IdEvent, latitude: GeoLatitude, longitude: GeoLongitude };
    const res = await FData.get(
      "/pgapi/v2/view_datas_with_geolocation",
      query,
      {
        "Content-Type": "application/json",
      }
    );

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("No se pudo cargar la información");
    }
  }

  onMount(() => {
    //promise = GetEvent();
    GeoLocation();
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
    <span class="control is-loading"> Cargando </span>
  {:then datas}
    {#each datas as { idevent, eventtype_label, dateevent, longitude, latitude, meters, description, num_comments, details, username }}
      <div class="mapevent">
        <WMap points={[{ geolocation: [longitude, latitude] }]} />
      </div>
      <div class="title">
        {eventtype_label}
        {new Date(dateevent).toLocaleDateString()}
        {new Date(dateevent).toLocaleTimeString()}
      </div>

      <hr />
      <div>
        <div>Comentarios 99</div>
        <div><input type="text" value="Comentarios" /></div>

        <div>
          <div>Usuario {username} * 2020-01-01 12:00:12</div>
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
