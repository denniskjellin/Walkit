<template>
  <section class="section-block section-goal">
    <SvgGoalblockIco class="homepage-svg" />
    <h2 class="h2-s">Målet:</h2>
    <!-- if got data, show it - else show 'laddar' -->
    <template v-if="destinationSumData">
      <p>{{ destinationSumData.from }} - {{ destinationSumData.to }}</p>
      <p>{{ numberToSweString(destinationSumData.km) }} km</p>
      <p>{{ numberToSweString(destinationSumData.steps_goal) }} steg</p>
    </template>
    <p v-else>Laddar...</p>
    <!-- check for error -->
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
let destinationSumData = await destinationSum();
</script>
