<template>
  <section class="section-block section-top-list">
    <!-- error msg if statement -->
    <p
      v-if="userDailyStepsData?.errorMsg || userMonthlyStepsData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ userDailyStepsData.errorMsg || userMonthlyStepsData.errorMsg }}
    </p>

    <div class="container-circle">
      <div class="content-circle-profile user-daily-steps">
        <!-- data of logged in users step of the day -->
        <template
          v-if="
            userDailyStepsData?.userSteps || userDailyStepsData?.userSteps === 0
          "
        >
          <h3 class="p">Dina steg idag</h3>
          <p class="p-circle">
            {{ numberToSweString(userDailyStepsData.userSteps) }}
          </p>
        </template>
        <template v-else>
          <p>Laddar...</p>
        </template>
      </div>

      <div class="content-circle-profile all-daily-steps">
        <template v-if="userMonthlyStepsData?.stepsCurrMonthUser">
          <h3 class="p">Dina steg i {{ userMonthlyStepsData.month }}</h3>
          <p class="p-circle">{{ userMonthlyStepsData?.stepsCurrMonthUser }}</p>
          <!-- data of all users step of the day -->
        </template>
        <template v-else>
          <p>Laddar...</p>
        </template>
      </div>
      <!-- <div class="content-circle-profile all-week-steps">
        <h3 class="p">Dina totalt</h3>
        <template>
          <h3 class="p"></h3>
          <p class="p-circle"></p>
        </template>
      </div> -->
    </div>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let userMonthlyStepsData = useState("userMonthlyStepsState");

// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  userMonthlyStepsData.value = await getUserMonthlySteps();
});
</script>
