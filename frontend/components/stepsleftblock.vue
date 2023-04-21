<template>
  <div class="content-div">
    <section class="section-block steps-left">
      <h2 v-if="remainingStepsData" class="h1-s bold">
        {{ remainingStepsData.remainingSteps }}
      </h2>
      <p v-else>Laddar...</p>
      <p class="bold">steg kvar!</p>
      <hr class="pink-line line-small" />
      <p
        v-if="remainingStepsData?.errorMsg"
        class="error-box center"
        role="alert"
        aria-live="assertive"
      >
        {{ remainingStepsData.errorMsg }}
      </p>
    </section>
  </div>
</template>

<script setup>
let remainingStepsData = useState("remainingStepsState");


onMounted(async () => {
  remainingStepsData.value = await getRemainingStepsData();
  
});
</script>
