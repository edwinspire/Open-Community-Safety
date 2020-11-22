<style>
.general_map {
    height: 100vh;
    width: 100%;
  }    
</style>

<script>
  //import 'ol/ol.css';
import WMap from './WidgetMap.svelte';


import {onMount} from 'svelte';

let viewMap;
let map;
let geox = 0;
let geoy = 0;
let points = [{geolocation: [-78.28557014465333, -0.6888001640038084] }, {geolocation: [-63.17345470190049, -17.73649467854382]}, {geolocation: [-104.74772985341974, 46.485123460637766]}, {geolocation:[-78.48848570690652, -0.20005187232716537]}];


onMount(()=>{

points =  [{geolocation: [-78.28557014465333, -0.6888001640038084] }, {geolocation: [-63.17345470190049, -17.73649467854382]}, {geolocation: [-104.74772985341974, 46.485123460637766]}, {geolocation:[-78.48848570690652, -0.20005187232716537]}];

});





</script>

<div class="general_map" >

  <WMap points={points}></WMap>
</div>
