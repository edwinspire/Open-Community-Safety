<script>
  import { onMount } from "svelte";
  import Report from "../../components/Report/Main.svelte";
  import Watched from "../../components/Watched/Main.svelte";
  import Events from "../../components/Events/Main.svelte";
  import MapAccount from "../../components/Map/Map.svelte";
  import { FetchData } from "../../components/FetchData.js";

  const WEBPUSH_PUBLICK = "BNi_4RFjAjaObFkgSvt3TSwUGg1cAO9aGiZlglXexl-U8U8zrqeOrUJR9nMRa6X2p4ECzk7XAivknIp1AMyIYfY";
  let FData = new FetchData();
  let componentSelected = Report;

  let MenuOpen = false;

  function ToggleClassMenu() {
    console.log("Toogle");
    MenuOpen = !MenuOpen;
  }

// I have found this code (or variations of) from; multiple sources
// but I could not find the original author
// here's one such source:
// https://stackoverflow.com/questions/42362235/web-pushnotification-unauthorizedregistration-or-gone-or-unauthorized-sub
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};


  async function  WebPushSubscription(){

    (async () => {
  if('serviceWorker' in navigator) {
    console.log(navigator.serviceWorker);
    // We first get the registration
    const registration = await navigator.serviceWorker.ready;
    // Asking for the subscription object
    let subscription = await registration.pushManager.getSubscription();
console.log(subscription);
    // If we don't have a subscription we have to create and register it!
    if (!subscription) {
      subscription = await subscribe(registration);
    }
    // Implementing an unsubscribe button
    //document.getElementById('unsubscribe').onclick = () => unsubscribe();
  }else{
    console.log('serviceWorker Unsoported');
  }
})()

// We use this function to subscribe to our push notifications
// As soon as you run this code once, it shouldn't run again if the initial subscription went well
// Except if you clear your storage
const subscribe = async (registration) => {
  // this is an annoying part of the process we have to turn our public key
  // into a Uint8Array
  const Uint8ArrayPublicKey = urlBase64ToUint8Array(WEBPUSH_PUBLICK);

  // registering a new subscription to our service worker's Push manager
  const subscription = await registration.pushManager.subscribe({
    // don't worry about the userVisible only atm
    userVisibleOnly: true,
    applicationServerKey: Uint8ArrayPublicKey
  });

  // Sending the subscription object to our Express server
  await fetch('/wp-subscription',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription.toJSON())
    }
  );
  return subscription;
};



// This simply shows our user that they are unsubscribed
const writeSubscriptionStatus = subscriptionStatus => {
  //document.getElementById("status").innerHTML = subscriptionStatus;
  console.log(subscriptionStatus);
};





/*
  const res = await FData.post("/wp-subscription", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
console.log("");
*/
}

  onMount( () => {

WebPushSubscription();


  });
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/home">
      <img src="logo.png" width="25" height="25" alt="Seguridad Comunitaria" />
      <strong> SEGURIDAD CIUDADANA</strong>
    </a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a
    class:is-active={MenuOpen}
    on:click={ToggleClassMenu}
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div class="navbar-menu" class:is-active={MenuOpen}>
    <div class="navbar-start">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Mi cuenta </a>

      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="navbar-item"> Reportes </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" href="/"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<div class="tabs is-boxed">
  <ul>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Report}
      on:click={() => {
        componentSelected = Report;
      }}>
      <a>
        <span class="icon is-small"><i
            class="fa fa-exclamation-triangle"
            aria-hidden="true" /></span>
        <span>Urgente</span>
      </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Events}
      on:click={() => {
        componentSelected = Events;
      }}>
      <a>
        <span class="icon is-small"><i
            class="fa fa-list-alt"
            aria-hidden="true" /></span>
        <span>Eventos</span>
      </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li
      class:is-active={componentSelected === Watched}
      on:click={() => {
        componentSelected = Watched;
      }}>
      <a>Seguimiento</a>
    </li>
    <li
      class:is-active={componentSelected === MapAccount}
      on:click={() => {
        componentSelected = MapAccount;
      }}>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a>Mapa</a>
    </li>
  </ul>
</div>
<svelte:component this={componentSelected} />
