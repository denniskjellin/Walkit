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
      <div class="content-circle all-daily-steps">
        <template
          v-if="
            getAllStepsData?.allUserSteps || getAllStepsData?.allUserSteps === 0
          "
        >
          <!-- data of all users step of the day -->
          <h3 class="p">Allas steg idag</h3>
          <p class="p-circle">
            {{ numberToSweString(getAllStepsData.allUserSteps) }}
          </p>
        </template>
        <p v-else>Laddar...</p>
      </div>
      <div class="content-circle user-daily-steps">
        <!-- data of logged in users step of the day -->
        <template v-if="averageStepsPerDay !== null">
          <h3 class="p">Allas steg i snitt / dag</h3>
          <p class="p-circle">
            {{ numberToSweString(averageStepsPerDay) }}
          </p>
        </template>
        <p v-else>Laddar...{{ numberToSweString(averageStepsPerDay) }}</p>
      </div>

      <div class="content-circle all-week-steps">
        <template
          v-if="
            getAllStepsWeekData?.stepsCurrWeek ||
            getAllStepsWeekData?.stepsCurrWeek === 0
          "
        >
          <h3 class="p">
            Allas steg vecka .{{ getAllStepsWeekData.currentWeekNumber }}
          </h3>
          <p class="p-circle">
            {{ numberToSweString(getAllStepsWeekData.stepsCurrWeek) }}
          </p>
        </template>
        <p v-else>Laddar...</p>
      </div>
    </div>
    <ToplistHome />
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let getAllStepsData = useState("getAllStepsState");
let getAllStepsWeekData = useState("getAllStepsWeekState");
let totalWalkedData = useState("totalWalkedData");

let averageStepsPerDay = computed(() => {
  if (
    !totalWalkedData?.value?.totalWalked ||
    totalWalkedData.value.totalWalked?.length <= 0
  ) {
    return 0;
  }

  const totalStepsWalked = totalWalkedData?.value?.totalWalked.reduce(
    (total, current) => total + current.steps,
    0
  );

  let minDateInTotalWalkedData = getMinDateFromTotalWalkedData(
    totalWalkedData.value
  );
  let daysBetweenDates = getDaysBetweenDates(
    new Date(),
    minDateInTotalWalkedData
  );

  let averageStepsPerDay = Math.round(totalStepsWalked / daysBetweenDates); //We dont want decimals, therefore we round the number

  return averageStepsPerDay;
});

// Function to get the number of days between two dates
function getDaysBetweenDates(firstDate, secondDate) {
  let differenceInMilliseconds = firstDate.getTime() - secondDate.getTime();
  let days = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24)); //Converts milliseconds to days

  return Math.abs(days); //Use math abs so we always return positive number. In this way it does not matter which date is firstDate and secondDate
}

// Function to get the min date from totalWalkedData
function getMinDateFromTotalWalkedData(totalWalkedData) {
  let datesArray = totalWalkedData?.totalWalked.map((element) => {
    return new Date(element.date);
  });

  let minDateFromArrayInMilliseconds = Math.min(...datesArray);

  return new Date(minDateFromArrayInMilliseconds);
}

// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  getAllStepsData.value = await getAllSteps();
  getAllStepsWeekData.value = await getAllStepsWeek();
});
</script>
