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
</style>

<div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{label} - {distance} metros</p>
      <span class="card-header-icon" aria-label="more options">
        <span class="icon"> <i class="fas fa-bell" /> </span>
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
          <figure class="image is-32x32">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6">{username}</p>
          <p class="subtitle is-7">{dateevent.toLocaleString('sv-SE')}</p>
        </div>
      </div>

      <div class="content">{description}</div>
    </div>
    <footer class="card-footer">


      
      <span class="card-footer-item">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="button">
          <span class="icon is-small">
            <i class="far fa-thumbs-up"></i>
          </span>
          <span>Like</span>
        </a>
        
        
      <span class="card-footer-item has-text-info">{number_comments}<span
          class="icon">
          <i class="far fa-comments" />
        </span>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="is-link"
          on:click={(e) => {
            console.log({ idevent });
            dispatch('comment', { idevent });
          }}>Comentar</a>
      </span>

      <span class="card-footer-item"><span class="icon has-text-info">
          <i class="far fa-eye" />
        </span>
        Seguir</span>
    </footer>
  </div>
</div>
