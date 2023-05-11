<template>
  <div id="map"></div>
</template>

<script setup>
let map;
let currentLocation = [36.190522, 27.940551]; // default center location
let startLocation = [62.357112, 17.31843]; // Sundsvall
let endLocation = [36.190522, 27.940551]; // Rhodos
onMounted(() => {
  map = L.map("map", {
    center: currentLocation,
    zoom: 8,
  });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let startMarker = L.marker(startLocation).addTo(map);
  let endMarker = L.circle(endLocation, {
    color: "ff00ff",
    fillColor: "blue",
    fillOpacity: 0.5,
    radius: 30000,
  }).addTo(map);

  let destinationLine = L.polygon([startLocation, endLocation], {
    color: "#ff00ff",
    fillColor: "#f03",
    fillOpacity: 0.5,
  }).addTo(map);
});
</script>

<style lang="scss" scoped>
#map {
  height: 300px;
  width: 100vw;
}
</style>
