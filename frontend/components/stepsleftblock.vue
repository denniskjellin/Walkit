<template>
  <div class="content-div">
    <section class="section-block steps-left">
      <h2 v-if="remainingStepsData?.remainingSteps" class="h1-s bold">{{ remainingStepsData.remainingSteps }}</h2>
      <h2 v-else class="h1-s bold">Laddar...</h2>
      <p>steg kvar!</p>
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
let remainingStepsData = useState('remainingStepsData');


onMounted(async () => {
  remainingStepsData.value  = await getRemainingSteps();
})

</script>
