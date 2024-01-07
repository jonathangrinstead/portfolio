import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    const lightStyle = "mapbox://styles/jonathangrinstead1997/clr3jr60x01cf01pj8p1x1o22";
    const darkStyle = "mapbox://styles/jonathangrinstead1997/clr3jxkl101dp01qwakrde4xa";

    this.lightStyle = lightStyle;
    this.darkStyle = darkStyle;

    const initialStyle = localStorage.getItem("darkMode") === "true" ? darkStyle : lightStyle;

    this.map = new mapboxgl.Map({
        container: this.element,
        style: initialStyle
    });

    this.#addMarkersToMap();
    this.#fitMapToMarkers();

    window.addEventListener("darkModeChange", event => {
      this.switchMapStyle(event.detail.isDarkMode);
    });
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const customMarker = document.createElement("div");
      customMarker.innerHTML = marker.marker_html;
      new mapboxgl.Marker(customMarker)
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(this.map);
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 12.5, duration: 0 });
  }

  switchMapStyle(isDarkMode) {
    this.map.setStyle(isDarkMode ? this.darkStyle : this.lightStyle);
  }

  disconnect() {
    window.removeEventListener("darkModeChange", event => {
      this.switchMapStyle(event.detail.isDarkMode);
    });
  }
}
