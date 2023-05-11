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

// Leaflet map
let map;

// error handling
let mapDataError = false;
let errorMsg = false;

// Parse JSON values and check for emptiness
let startLocation = destinationsData?.[0]?.start_cordinations
  ? JSON.parse(destinationsData[0].start_cordinations)
  : false;
let endLocation = destinationsData?.[0]?.end_cordinations
  ? JSON.parse(destinationsData[0].end_cordinations)
  : false;
// check if startLocation and endLocation is empty
if (!startLocation || !endLocation) {
  mapDataError = true;
}

// Leaflet map
onMounted(() => {
  if (!mapDataError) {
    map = L.map("map", {
      center: endLocation,
      zoom: 12,
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

    // start marker and end marker with polygon line (startLocation and endLocation is parsed JSON)
    let startMarker = L.marker(startLocation).addTo(map);
    let endMarker = L.marker(endLocation, { icon: greenIcon }).addTo(map);

    // polygon line
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
