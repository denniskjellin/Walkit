<template>
  <section class="datalist-wrapper" aria-label="toplista över mest steg">
    <SvgTopListIco class="datalist-ico" />
    <h2 class="h2-s">Top 10</h2>
    <div class="datalist-header">
      <div>
        <span class="datalist-header-order">#</span>
        Namn
      </div>
      <div class="datalist-header-steps">Antal steg</div>
    </div>
    <ul class="datalist-list">
      <li
        class="datalist-item"
        v-for="(item, index) in topList"
        :key="`toplist-${index}`"
      >
        <div>
          <span class="datalist-order">{{ index + 1 }}</span>
          {{ item.full_name }}
        </div>
        {{ numberToSweString(item.steps) }}
      </li>
    </ul>
  </section>
</template>

<script setup>
// state variables
let getAllUsersData = useState("getAllUsersState");
let getToplistStepsData = useState("getToplistStepsState");

let topList = ref([]);

// Watch for changes in data
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
