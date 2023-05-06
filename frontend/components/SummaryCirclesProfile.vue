<template>
  <section
    class="profile-section-block profile-sum-circle"
    aria-label="Sammanfattning av steg statistik"
  >
    <SvgFoot-ico class="foot-ico" />
    <!-- error msg if statement -->
    <p
      v-if="
        userDailyStepsData?.errorMsg ||
        userMonthlyStepsData?.errorMsg ||
        userAllTimeStepsData?.errorMsg
      "
      class="error-box center"
      aria-live="assertive"
    >
      {{
        userDailyStepsData.errorMsg ||
        userMonthlyStepsData.errorMsg ||
        userAllTimeStepsData.errorMsg
      }}
    </p>

    <div class="container-circle">
      <section
        class="content-circle-profile user-daily-steps"
        aria-label="Dina steg idag"
      >
        <!-- data of logged in users step of the day -->
        <template
          v-if="
            userDailyStepsData?.userSteps || userDailyStepsData?.userSteps === 0
          "
        >
          <h2 class="p">Dina steg idag</h2>
          <p class="p-circle">
            {{ numberToSweString(userDailyStepsData.userSteps) }}
          </p>
        </template>
        <template v-else>
          <p>Laddar...</p>
        </template>
      </section>

      <section
        class="content-circle-profile all-daily-steps"
        aria-label="Dina steg nuvarande månad"
      >
        <template
          v-if="
            userMonthlyStepsData?.stepsCurrMonthUser ||
            userMonthlyStepsData?.stepsCurrMonthUser === 0
          "
        >
          <h2 class="p">Dina steg i {{ userMonthlyStepsData.month }}</h2>
          <p class="p-circle">{{ numberToSweString(userMonthlyStepsData?.stepsCurrMonthUser) }}</p>
          <!-- data of all users step of the day -->
        </template>
        <template v-else>
          <p>Laddar...</p>
        </template>
      </section>
      <section
        class="content-circle-profile all-profile-steps"
        aria-label="Dina steg totalt"
      >
        <template
          v-if="
            userAllTimeStepsData?.stepsAllTimeUser ||
            userAllTimeStepsData?.stepsAllTimeUser === 0
          "
        >
          <h2 class="p">Dina steg totalt</h2>
          <p class="p-circle">{{ numberToSweString(userAllTimeStepsData?.stepsAllTimeUser) }}</p>
          <!-- data of all users step of the day -->
        </template>
        <template v-else>
          <p>Laddar...</p>
        </template>
      </section>
    </div>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let userMonthlyStepsData = useState("userMonthlyStepsState");
let userAllTimeStepsData = useState("userAllTimeStepsState");

// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  userMonthlyStepsData.value = await getUserMonthlySteps();
  userAllTimeStepsData.value = await getAllTimeStepsUser();
});
</script>
