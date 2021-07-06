import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const buildMap = (mapElement) => {
  mapboxgl.accessToken = process.env.MAPBOX_API_KEY; //  process.env.MAPBOX_API_KEY; or mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {

    const popup = new mapboxgl.Popup().setHTML(marker.info_window); // info window popup

    // make a marker image instead of the usual tear drop
    const img_element = document.createElement('div');
      img_element.className = 'marker';
      img_element.style.backgroundImage = `url('${marker.image_url}')`;  // set by controller
      img_element.style.backgroundSize = 'contain';
      img_element.style.width = '25px';
      img_element.style.height = '25px';

    new mapboxgl.Marker(img_element)  //pass the image to this Marker
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { duration:1000, padding: 70, maxZoom: 30 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = buildMap(mapElement);
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
