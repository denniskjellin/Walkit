<template>
  <section
    class="section-block section-percentage"
    aria-label="Procentuell progression mot destinationsmålet"
  >
    <h2 class="visually-hidden">Procentuellt av målet som är uppnått</h2>
    <!-- writing out the % accomplished towards the destination -->
    <SvgPercentblockIco class="homepage-svg" />
    <template v-if="percentage">
      <h2 class="h1-s">{{ percentage }}%</h2>
      <p>av målet är uppnått!</p>
    </template>
    <!-- show %, if not show 'laddar..' -->
    <p v-else>
      {{ percentage !== null ? "0% av målet är uppnått." : "Laddar..." }}
    </p>
    <!-- progress bar, styling in sectionblock.scss -->
    <progress class="progress" :value="percentage" max="100"></progress>
    <!-- error msg if statement -->
    <p
      v-if="totalStepsData?.errorMsg"
      class="error-box-index"
      role="alert"
      aria-live="assertive"
    >
      {{ totalStepsData.errorMsg }}
    </p>
    
  </section>
</template>

<script setup>
// import state variables
let totalStepsData = useState("totalStepsData");
let totalWalkedData = useState("totalWalkedData");

// computed property to calculate percentage
let percentage = computed(() => {
  if (!totalStepsData?.value || !totalWalkedData?.value) return null;

  let totalWalkedStepsSum = totalWalkedData.value?.totalWalked.reduce(
    (total, current) => total + current.steps,
    0
  );
  // math function to calculate percentage
  return Math.floor(
    (totalWalkedStepsSum / totalStepsData.value.totalSteps) * 100
  );
});

// onMounted hook to fetch data
onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  totalWalkedData.value = await getTotalWalked();
});
</script>
