<template>
  <section class="section-block section-top-list">
    <!-- error msg if statement -->
    <p
      v-if="
        userDailyStepsData?.errorMsg ||
        getAllStepsData?.errorMsg ||
        getAllStepsWeekData?.errorMsg
      "
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{
        userDailyStepsData.errorMsg ||
        getAllStepsData.errorMsg ||
        getAllStepsWeekData.errorMsg
      }}
    </p>

    <div class="container-circle">
      <div class="content-circle user-daily-steps">
        <!-- data of logged in users step of the day -->
        <template
          v-if="
            userDailyStepsData?.userSteps || userDailyStepsData?.userSteps === 0
          "
        >
          <h3 class="p">Dina steg idag</h3>
          <p class="p-circle">{{ numberToSweString(userDailyStepsData.userSteps) }}</p>
        </template>
        <p v-else>Laddar...</p>
      </div>

      <div class="content-circle all-daily-steps">
        <template v-if="getAllStepsData?.allUserSteps || getAllStepsData?.allUserSteps === 0">
          <!-- data of all users step of the day -->
          <h3 class="p">Allas steg idag</h3>
          <p class="p-circle">{{ numberToSweString(getAllStepsData.allUserSteps) }}</p>
        </template>
        <p v-else>Laddar...</p>
      </div>
      <div class="content-circle all-week-steps">
        <template v-if="getAllStepsWeekData?.stepsCurrWeek || getAllStepsWeekData?.stepsCurrWeek === 0">
          <h3 class="p">Allas steg vecka .{{ getAllStepsWeekData.currentWeekNumber }} </h3>
          <p class="p-circle">{{ numberToSweString(getAllStepsWeekData.stepsCurrWeek) }}</p>
        </template>
        <p v-else>Laddar...</p>
      </div>
    </div>
    <p>Icon</p>
    <h3 class="h2-s">Top list</h3>
    <p>Komponent för tp</p>
    <p>Section block</p>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let getAllStepsData = useState("getAllStepsState");
let getAllStepsWeekData = useState("getAllStepsWeekState");




// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  getAllStepsData.value = await getAllSteps();
  getAllStepsWeekData.value = await getAllStepsWeek();
});


</script>
