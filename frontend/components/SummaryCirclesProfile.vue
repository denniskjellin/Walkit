<template>
  <section class="section-block section-top-list">
    <!-- error msg if statement -->
    <p
      v-if="userDailyStepsData?.errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ userDailyStepsData.errorMsg }}
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
          <p class="p-circle">
            {{ numberToSweString(userDailyStepsData.userSteps) }}
          </p>
        </template>
        <p v-else>Laddar...</p>
      </div>

      <div class="content-circle all-daily-steps">
        <h3 class="p">Dina steg i mars</h3>
        <template>
          <!-- data of all users step of the day -->
          <h3 class="p">Allas steg idag</h3>
          <p class="p-circle"></p>
        </template>
        <!-- <p v-else>Laddar...</p> -->
      </div>
      <div class="content-circle all-week-steps">
        <h3 class="p">Dina totalt</h3>
        <template>
          <h3 class="p"></h3>
          <p class="p-circle"></p>
        </template>
        <!-- <p v-else>Laddar...</p> -->
      </div>
    </div>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");



// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();


});
</script>
