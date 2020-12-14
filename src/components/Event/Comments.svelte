<script>
  import { FetchData } from "../FetchData.js";
  import { onMount } from "svelte";
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

  async function GetComments() {
    let query = {
      idevent: IdEvent,
    };
    const res = await FData.get(
      "/pgapi/v2/events/comments",
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
    promise = GetComments();
  });
</script>

<style>
</style>

<div>
  {#await promise}
    <!-- svelte-ignore a11y-missing-attribute -->
    <span class="control is-loading"> Cargando Cometarios</span>
  {:then datas_fetch}
    {#each datas_fetch as { idcomment, iduser, date_comment, data }}
      <div><span>{date_comment}</span><span>data.comment_text</span></div>
    {/each}
  {:catch error}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="color: red" class="is-loading">{error.message}</a>
  {/await}
</div>
