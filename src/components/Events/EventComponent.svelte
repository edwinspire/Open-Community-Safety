<script>
  import { onMount } from "svelte";
  import WMap from "../Map/WidgetMap.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let idevent = 0;
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
      <p class="card-header-title">{label}</p>
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

    <footer class="card-footer">
      <span class="card-footer-item">
        <span class="icon"> <i class="far fa-thumbs-up" /> </span>

        <span>Like</span>
      </span>
      <span class="card-footer-item"><span
                    on:click={(e) => {
            dispatch('comment', { idevent });
          }}>
          {number_comments}
          <span class="icon"> <i class="far fa-comments" /> </span>
          <span>Comentar</span>
        </span></span>
      <span class="card-footer-item">
        <span class="icon "><i class="fas fa-ruler" /> </span>
      <span>{distance} metros</span></span>
    </footer>
  </div>
  
</div>
