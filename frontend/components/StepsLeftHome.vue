<template>
  <div class="content-div">
    <section class="section-block steps-left" aria-label="Antal steg kvar till destinationen">
      <h2 v-if="remainingStepsData" class="h1-s bold confetti-h2">
        {{ numberToSweString(remainingStepsData.remainingSteps) }}<SvgConfetti class="confetti-icon" />
      </h2>
      <p v-else>Laddar...</p>
      <p class="bold">steg kvar mot {{ destinationSumData.to }}!</p>
      <hr class="pink-line line-small" />
      <p
        v-if="remainingStepsData?.errorMsg"
        class="error-box center"
        aria-live="assertive"
      >
        {{ remainingStepsData.errorMsg }}
      </p>
    </section>
  </div>
</template>

<script setup>
let remainingStepsData = useState("remainingStepsState");
let destinationSumData = await destinationSum();


onMounted(async () => {
  remainingStepsData.value = await getRemainingStepsData();
  
});
</script>
