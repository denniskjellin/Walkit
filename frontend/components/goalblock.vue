<template>
  <section class="section-block section-goal">
    <SvgGoalblockIco class="goalblock-ico" />
    <h2 class="h2-s">Målet:</h2>
    <template v-if="destinationSumData && totalStepsData">
      <p>
        {{ destinationSumData.from }} - {{ destinationSumData.to }}
      </p>
      <p>{{ destinationSumData.km }} km</p>
      <p>
        {{ totalStepsData.totalSteps }} steg
      </p>
    </template>
    <p v-else>Laddar...</p>

    <p
      v-if="destinationSumData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ destinationSumData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
let totalStepsData = useState("totalStepsData");
let destinationSumData = useState("destinationSumData");

onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  destinationSumData.value = await destinationSum();
});
</script>
