<template>
  <section class="section-block section-goalprog">
    <!-- svg icon -->
    <SvgGoalprogIco class="homepage-svg" />
    <h2 class="h2-s">Avverkat:</h2>
    <!-- if got data show it, else show 'laddar'  -->
    <p v-if="totalWalkedData">{{ totalWalkedData.totalWalked }} steg</p>
    <p v-else>Laddar...</p>
    <!-- if error msg, show -->
    <p
      v-if="totalWalkedData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ totalWalkedData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
// import state variable
let totalWalkedData = useState("totalWalkedData");
</script>
