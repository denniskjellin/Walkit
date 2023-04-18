<template>
  <div class="content-div">
    <section class="section-block steps-left">
      <h2 class="h1-s bold">{{ remainingStepsData.remainingSteps }}</h2>
      <p>steg kvar!</p>
      <hr class="pink-line line-small" />
       <p
        v-if="remainingStepsData.errorMsg"
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
let remainingStepsData = useState('remainingStepsData', () => {
  return {
    remainingSteps: 10,
    errorMsg: ""
  }
});


onMounted(async () => {
  remainingStepsData.value  = await getRemainingSteps();

})

</script>
