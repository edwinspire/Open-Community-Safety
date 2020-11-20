<style>
    .map{
        height: 800px;
        width: 100%;
    }
</style>

<script>
  //import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import * as Geom from 'ol/geom';
import * as Proj from 'ol/proj';
import {Icon, Style} from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

import {onMount} from 'svelte';

let viewMap;
let map;
let geox = 0;
let geoy = 0;



onMount(()=>{


var iconFeature = new Feature(new Point([0, 0]));
iconFeature.set('style', createStyle('img/icon.png', undefined));


  var VLayer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: new VectorSource({features: [iconFeature]}),
    });


  var vectorSource = VLayer.getSource();

  function createStyle(src, img) {
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.96],
      crossOrigin: 'anonymous',
      src: src,
      img: img,
      imgSize: img ? [img.width, img.height] : undefined,
    }),
  });
}

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    VLayer ],
  target: document.getElementById('map'),
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});

var selectStyle = {};
var select = new Select({
  style: function (feature) {
    var image = feature.get('style').getImage().getImage();
    if (!selectStyle[image.src]) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      for (var i = 0, ii = data.length; i < ii; i = i + (i % 4 == 2 ? 2 : 1)) {
        data[i] = 255 - data[i];
      }
      context.putImageData(imageData, 0, 0);
      selectStyle[image.src] = createStyle(undefined, canvas);
    }
    return selectStyle[image.src];
  },
});
map.addInteraction(select);

map.on('pointermove', function (evt) {
  console.log(evt);
  map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
    ? 'pointer'
    : '';
});


function addMarker(coordinates) {
    console.log(coordinates);
    var marker = new Feature(new Geom.Point(coordinates));
    var zIndex = 1;
    marker.setStyle(createStyle('img/icon.png', undefined));
    vectorSource.addFeature(marker);
  }

map.on('dblclick', function (evt) {
    console.log(Proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    addMarker(evt.coordinate);
  });

});





</script>



<div class="map" id="map"></div>