<template>
  <section class="section-block section-goal">
    <SvgGoalblockIco class="goalblock-ico"/>
    <h2 class="h2-s">Målet</h2>
    <p>{{ destinationSumData.from }} - {{ destinationSumData.to }}</p>
    <p>{{ destinationSumData.km }} km</p>
    <p>{{ totalStepsData.totalSteps }} steg</p>
    <p
      v-if="destinationSumData.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ destinationSumData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
  let totalStepsData = useState("totalStepsData", () => {
  return {
    totalSteps: 1,
  };
});

let destinationSumData = useState("destinationSumData", () => {
  return {
    to: "",
    from: "",
    steps_goal: 0,
    is_active: false,
    km: 0,
    errorMsg: "",
  };
});



onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  destinationSumData.value = await destinationSum();
});
</script>
