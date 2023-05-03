<template>
  <section
    class="section-block section-goalprog"
    aria-label="Antal steg avverkade sektion"
  >
    <!-- svg icon -->
    <SvgGoalprogIco class="homepage-svg" />
    <h2 class="h2-s">Avverkat:</h2>
    <!-- if got data show it, else show 'laddar'  -->

    <template v-if="totalWalkedStepsSum || totalWalkedStepsSum === 0">
      <p>{{ totalWalkedStepsSum }}</p>
    </template>
    <p v-else>Laddar...</p>
    <!-- if error msg, show -->
    <p
      v-if="totalWalkedData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ totalWalkedData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
// import state variable
let totalWalkedData = useState("totalWalkedData");
// import computed variable
let totalWalkedStepsSum = computed(() => {
  return totalWalkedData.value?.totalWalked?.reduce(
    (total, current) => total + current.steps,
    0
  );
});
</script>
