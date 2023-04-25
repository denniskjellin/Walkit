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
          <p class="p-circle">
            {{ numberToSweString(userDailyStepsData.userSteps) }}
          </p>
        </template>
        <p v-else>Laddar...</p>
      </div>

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
    <p>Icon</p>

    <h3 class="h2-s">Top list</h3>
    <p>Komponent för tp</p>
    <!-- <p v-for="user in mapStepsToUser">{{ full_name }} {{ steps }}</p> -->
    <ul>
      <li v-for="item in topList">{{ item.full_name }} {{ item.steps }}</li>
    </ul>
  </section>
</template>

<script setup>
// state variable
let userDailyStepsData = useState("userDailyStepsState");
let getAllStepsData = useState("getAllStepsState");
let getAllStepsWeekData = useState("getAllStepsWeekState");
let getAllUsersData = useState("getAllUsersState");
let getToplistStepsData = useState("getToplistStepsState");
let errorMsg = ref(null);

let topList = ref([]);

watch(getToplistStepsData, async (newVal, oldVal) => {
  if (newVal) {
    topList.value = mapStepsToUser(
      getAllUsersData.value,
      getToplistStepsData.value
    );
  }
});

// Map steps to user
const mapStepsToUser = (getAllUsersData, getToplistStepsData) => {
  if (!getAllUsersData?.allUsers || !getToplistStepsData?.allSteps) {
    return [];
  }
  const users = JSON.parse(JSON.stringify(getAllUsersData.allUsers));
  const steps = JSON.parse(JSON.stringify(getToplistStepsData.allSteps));

  if (users && steps) {
    const usersWithSteps = users.map((user) => {
      const userSteps = steps.filter((step) => step.user_id === user.id);
      let totalStep = 0;

      // If user has steps, reduce array of steps to get sum of steps
      if (userSteps.length > 0) {
        totalStep = userSteps.reduce((acc, curr) => {
          return acc + curr.steps;
        }, 0);
      } else {
        totalStep = 0;
        errorMsg = "Inga steg hittades";
      }

      return {
        ...user,
        steps: totalStep,
      };
    });

    return usersWithSteps
      .sort((a, b) => {
        return b.steps - a.steps;
      })
      .slice(0, 10);
  }
};

// onMounted hook to fetch data
onMounted(async () => {
  userDailyStepsData.value = await getUserSteps();
  getAllStepsData.value = await getAllSteps();
  getAllStepsWeekData.value = await getAllStepsWeek();
  getAllUsersData.value = await getAllUsers();
  getToplistStepsData.value = await getToplistSteps();
  topList.value = mapStepsToUser(
    getAllUsersData.value,
    getToplistStepsData.value
  );
});
</script>
