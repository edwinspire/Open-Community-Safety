<script>
  import { FetchData } from "../FetchData.js";
  //import MModal from "../ModalMessage.svelte";
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";
  import { createEventDispatcher } from "svelte";
  import EventComponent from "./EventComponent.svelte";

  const dispatch = createEventDispatcher();

  let GeoLatitude = 0;
  let GeoLongitude = 0;
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

  function GeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        GeoLatitude = position.coords.latitude;
        GeoLongitude = position.coords.longitude;
        promise = GetEventsAround();
      });
    } else {
      console.log("No se pudo obtener las coordenadas");
    }
  }

  onMount(async () => {
    GeoLocation();
  });
</script>

<style>
</style>

<div>
  {#await promise}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="is-loading">Cargando...</a>
  {:then datas}
    {#each datas as { idevent, label, dateevent, meters, description, num_comments, details }, i}
      <EventComponent
      number_comments = {num_comments}
      {description}
        distance={Math.ceil(meters)}
        {label}
        latitude="details.geo.longitude,"
        longitude="details.geo.latitude" />

    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
