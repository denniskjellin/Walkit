<template>
  <template v-if="!destinationsData.length">
    <div class="container">
      <p role="alert" aria-live="assertive" class="error-box">
        {{ errorMsg ? errorMsg : "Kunde ej läsa in karta." }}
      </p>
    </div>
  </template>
  <div id="map" v-else>
    <!-- if error-->
  </div>
</template>

<script setup>
// function fetch destinations from Supabase
const fetchDestinations = async () => {
  let supabase = useSupabaseClient();

  try {
    let { data: destinationsData, error } = await supabase
      .from("destinations")
      .select("*")
      .match({ is_active: true }); // only show destinations that are not hidden (the rest is soft deleted)

    if (destinationsData) {
      return destinationsData;
    }

    if (error) throw error;
  } catch (error) {
    // Set a custom error message

    destinationsData.errorMsg = "Kunde inte hämta destinationer";
    destinationsData.fail = true;

    return destinationsData;
  }
};
let destinationsData = [];
destinationsData = await fetchDestinations();

let mapDataError = false;
let map;
let errorMsg = false;
// Parse JSON values and check for emptiness
let currentLocation = destinationsData?.[0]?.current_cordinations
  ? JSON.parse(destinationsData[0]?.current_cordinations)
  : false;
let startLocation = destinationsData?.[0]?.start_cordinations
  ? JSON.parse(destinationsData[0].start_cordinations)
  : false;
let endLocation = destinationsData?.[0]?.end_cordinations
  ? JSON.parse(destinationsData[0].end_cordinations)
  : false;

if (!currentLocation || !startLocation || !endLocation) {
  mapDataError = true;
}

onMounted(() => {
  if (!mapDataError) {
    map = L.map("map", {
      center: currentLocation,
      zoom: 5,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 15,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // end marker = greenIcon
    let greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    let startMarker = L.marker(startLocation).addTo(map);
    let endMarker = L.marker(endLocation, { icon: greenIcon }).addTo(map);
    let currentMarker = L.circle(currentLocation, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);

    let destinationLine = L.polygon([startLocation, endLocation], {
      color: "#ff00ff",
      fillColor: "#f03",
      fillOpacity: 0.5,
    }).addTo(map);
  } else {
    mapDataError = true;
  }
});
</script>

<style lang="scss" scoped>
#map {
  height: 300px;
  width: 100vw;
}
</style>
