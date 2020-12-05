<script>
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let longitude = 0;
  export let latitude = 0;
  export let label = "";
  export let distance = -1;
  export let dateevent = new Date();
  export let description = "";
  export let number_comments = "";
  export let username = "";

</script>


<style>
  .mapevent {
    height: 30vh;
    width: 100%;
  }

</style>

<div>

<div class="card">
  <div class="card-image">
    <div class="image mapevent">
      <WMap points={[{ geolocation: [longitude, latitude] }]}></WMap>
    </div>
      
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
      <p class="title is-4">{label} - {distance} metros</p>
      <p class="subtitle is-6">{username}</p>
      </div>
    </div>

    <div class="content">
      {description}
    <a href="#">{number_comments}</a> Comentarios
      <br>
    <time datetime={dateevent}>{dateevent.toLocaleString('en-US', { timeZone: 'UTC' })}</time>
    </div>
  </div>
</div>
<hr>
</div>