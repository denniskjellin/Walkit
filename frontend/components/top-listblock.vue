<template>
  <section class="section-block section-top-list">
    <!-- error msg if statement -->
    <p
      v-if="userDailyStepsData?.errorMsg || getAllStepsData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ userDailyStepsData.errorMsg || getAllStepsData.errorMsg}}
    </p>

    <div class="container-circle">
      <div class="content-circle">
        <!-- data of logged in users step of the day -->
        <template
          v-if="
            userDailyStepsData?.userSteps || userDailyStepsData?.userSteps === 0
          "
        >
          <h3 class="p">Dina steg idag</h3>
          <p>{{ userDailyStepsData.userSteps }}</p>
        </template>
        <p v-else>Laddar...</p>
      </div>

      <div class="content-circle">
        <template v-if="getAllStepsData?.allUserSteps">
          <!-- data of all users step of the day -->
          <h1 class="p">Allas steg</h1>
          <p>{{ getAllStepsData.allUserSteps }}</p>
        </template>
        <p v-else>Laddar...</p>
      </div>
      <div class="content-circle">
        <h1 class="h1-s">div 3</h1>
        <p>Section block</p>
      </div>
    </div>
    <p>Icon</p>
    <h2 class="h2-s">Top list</h2>
    <p>Komponent för tp</p>
    <p>Section block</p>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let getAllStepsData = useState("getAllStepsState");
console.log(getAllStepsData.value);

// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  getAllStepsData.value = await getAllSteps();
});
</script>
