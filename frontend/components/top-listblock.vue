<template>
  <section class="section-block section-top-list">
    <div class="container-circle">
      <div class="content-circle">
        <!-- data of logged in users step of the day -->
        <template v-if="topListData?.userSteps || topListData?.userSteps === 0">
          <h3 class="p">Dina steg idag</h3>
          <p>{{ topListData.userSteps }}</p>
        </template>
        <p v-else>Laddar...</p>
        <!-- error msg if statement -->
        <p
          v-if="topListData?.errorMsg"
          class="error-box center"
          role="alert"
          aria-live="assertive"
        >
          {{ topListData.errorMsg }}
        </p>
      </div>

      <div class="content-circle">
        <h1 class="h1-s">div 2</h1>
        <p>Section block</p>
      </div>
      <div class="content-circle">
        <h1 class="h1-s">div 3</h1>
        <p>Section block</p>
      </div>
    </div>
    <p>Icon</p>
    <h2 class="h2-s">Top list</h2>
    <p>Komponent fför tp</p>
    <p>Section block</p>
  </section>
</template>

<script setup>
// state variable
let topListData = useState("topListState");

onMounted(async () => {
  topListData.value = await getUserSteps();
  console.log(topListData.value.userSteps, "tp data");
});
</script>
