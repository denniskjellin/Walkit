<template>
  <p>Icon</p>

  <h3 class="h2-s">Top list</h3>
  <p>Komponent för tp</p>
  <!-- <p v-for="user in mapStepsToUser">{{ full_name }} {{ steps }}</p> -->
  <ul>
    <li v-for="item in topList">{{ item.full_name }} {{ item.steps }}</li>
  </ul>
</template>

<script setup>
let getAllUsersData = useState("getAllUsersState");
let getToplistStepsData = useState("getToplistStepsState");


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
  getAllUsersData.value = await getAllUsers();
  getToplistStepsData.value = await getToplistSteps();
  topList.value = mapStepsToUser(
    getAllUsersData.value,
    getToplistStepsData.value
  );
});
</script>