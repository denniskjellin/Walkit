<template>
  <section class="section-block section-goal">
    <SvgGoalblockIco class="homepage-svg" />
    <h2 class="h2-s">Målet:</h2>
    <!-- if got data, show it - else show 'laddar' -->
    <template v-if="destinationSumData && totalStepsData">
      <p>{{ destinationSumData.from }} - {{ destinationSumData.to }}</p>
      <p>{{ destinationSumData.km }} km</p>
      <p>{{ totalStepsData.totalSteps }} steg</p>
    </template>
    <p v-else>Laddar...</p>

    <!-- check for error -->
    <p
      v-if="destinationSumData?.errorMsg || totalStepsData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ destinationSumData.errorMsg || totalStepsData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
// import state variables
let totalStepsData = useState("totalStepsData");
let destinationSumData = useState("destinationSumData");

// onMounted hook to fetch data
onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  destinationSumData.value = await destinationSum();
});
</script>
