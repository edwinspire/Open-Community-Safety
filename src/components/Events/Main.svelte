<script>
  import { FetchData } from "../FetchData.js";
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";

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
      <div class="event">
        <div class="columns is-mobile">
          <div class="column ">
            <div class="mapevent">
              <WMap
                points={[{ geolocation: [details.geo.longitude, details.geo.latitude] }]} />
            </div>
          </div>
          <div class="column">
            <!-- Main container -->
            <nav class="level is-mobile">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">{label}</span>
                      <span class="tag is-danger"><span class="icon">
                          <i class="fa fa-user-secret" aria-hidden="true" />
                        </span></span>
                    </div>
                  </div>
                </div>
                <span class="level-item">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">{Math.ceil(meters)}</span>
                      <span class="tag is-primary">metro(s)</span>
                    </div>
                  </div>
                </span>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item">
                  {new Date(dateevent).toLocaleDateString()}
                  {new Date(dateevent).toLocaleTimeString()}
                </p>
              </div>
            </nav>

            <div class="event_text">{label} reportado {description}</div>

            <nav class="level is-mobile">
              <div class="level-left" />

              <!-- Right side -->
              <div class="level-right">
                <span class="level-item">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">{num_comments}</span>
                      <span class="tag is-primary">comentarios</span>
                    </div>
                  </div>
                </span>
                <!-- svelte-ignore a11y-missing-attribute -->
                <p class="level-item">
                  <a class="button is-link is-small">Comentar</a>
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>
    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
