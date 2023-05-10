<template>
  <div id="map"></div>
</template>

<script setup>
let map;
let center = [36.190522, 27.940551]; // default center location
let start = [62.357112, 17.31843]; // Sundsvall
let end = [36.190522, 27.940551]; // Rhodos
onMounted(() => {
  map = L.map("map", {
    center: center,
    zoom: 6,
  });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let startMarker = L.marker(start).addTo(map);
  let endMarker = L.marker(end).addTo(map);

  let destinationLine = L.polygon([start, end], {
    color: "red",
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
