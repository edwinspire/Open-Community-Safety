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
    let query = {
      idevent: IdEvent,
      latitude: GeoLatitude,
      longitude: GeoLongitude,
    };
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
      <style>
        .mapevent {
          height: 40vh;
          width: 100%;
        }
        .divisor {
          border-bottom: double;
        }
      </style>
      <div class="divisor">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{eventtype_label}</p>
            <span class="card-header-icon" aria-label="more options">
              <span class="icon"><i class="far fa-bell" /></span>
            </span>
          </header>
          <div class="card-image">
            <div class="image mapevent">
              <WMap points={[{ geolocation: [longitude, latitude] }]} />
            </div>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-6">{username}</p>
                <p class="subtitle is-7">
                  {new Date(dateevent).toLocaleDateString()}
                  {new Date(dateevent).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div class="content">{description}</div>
          </div>
        </div>

        <div>
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Comentar" />
            </div>
            <div class="control">
              <span class="button is-info"> <i class="far fa-comment" /> </span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
