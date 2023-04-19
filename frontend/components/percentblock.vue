<template>
  <section class="section-block section-percentage">
    <!-- writing out the % accomplished towards the destination -->
    <SvgPercentblockIco class="percentblock-ico"/>
    <h2 class="h1-s">{{ percentage }}%</h2>
    <p>av målet är uppnått!</p>
    <!-- progress bar, styling in sectionblock.scss -->
    <progress class="progress" :value="percentage" max="100"></progress>
    <p
      v-if="totalStepsData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ totalStepsData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
let totalStepsData = useState("totalStepsData");
let totalWalkedData = useState("totalWalkedData");

let percentage = computed(() => {
  if(!totalStepsData.value || !totalWalkedData.value)
    return 0;
    
  return Math.floor(totalWalkedData.value.totalWalked / totalStepsData.value.totalSteps * 100);
});


onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  totalWalkedData.value = await getTotalWalked();
});
</script>
