<script>
  import { FetchData } from "../FetchData.js";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let IdEvent = -1;
  let comment_text = "";
  let FData = new FetchData();
  let promise = new Promise(
    () => {},
    () => {}
  );

  let GeoLatitude = 0;
  let GeoLongitude = 0;

  async function GetComments() {
    let query = {
      idevent: IdEvent,
    };
    const res = await FData.get("/pgapi/v2/events/comments", query, {
      "Content-Type": "application/json",
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("No se pudo cargar la información");
    }
  }

  async function SendComment() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        GeoLatitude = position.coords.latitude;
        GeoLongitude = position.coords.longitude;

        try {
          let query = {
            idevent: IdEvent,
            latitude: GeoLatitude,
            longitude: GeoLongitude,
            comment_text: comment_text,
          };

          const res = await FData.post("/pgapi/v2/events/comment", query, {
            "Content-Type": "application/json",
          });

          if (res.ok) {
            let data = await res.json();
            console.log(data);
            promise = GetComments();
          } else {
            console.log(res.status);
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.log("No se pudo obtener las coordenadas");
    }
  }

  onMount(() => {
    promise = GetComments();
  });
</script>

<style>
  .input_comment {
    width: 100%;
  }
  .input_size {
    width: inherit;
  }
</style>

<div>
  <div>
    <div class="field has-addons input_comment">
      <div class="control input_size">
        <input
          class="input is-small"
          type="text"
          placeholder="Comentar"
          bind:value={comment_text} />
      </div>
      <div class="control">
        <span class="button is-info is-small" on:click={SendComment}>
          <i class="far fa-comment" />
        </span>
      </div>
    </div>
  </div>

  {#await promise}
    <!-- svelte-ignore a11y-missing-attribute -->
    <span class="control is-loading"> Cargando Cometarios</span>
  {:then datas_fetch}
    {#each datas_fetch as { idcomment, iduser, date_comment, data }}
      <article class="message is-primary">
        <div class="message-body">
          <div>{date_comment}</div>
          {data.comment_text}
        </div>
      </article>
    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
