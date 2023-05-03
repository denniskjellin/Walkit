<template>
  <div class="profile-section-block week-stats">
    <div class="toplist-wrapper">
      <!-- <SvgTopListIco class="top-list-ico" />  -->
      <h3 class="h2-s">Dina steg v.{{ getUserWeeklyStatsData?.currentWeekNumber }}</h3>
      <div class="toplist-header">
        <div>Datum</div>
        <div class="toplist-header-steps">Antal steg</div>
      </div>
      <ul class="toplist-list">
        <li
          class="toplist-item"
          v-for="(step, index) in getUserWeeklyStatsData?.dailySteps"
          :key="index"
        >
          {{ step.date }}

          <div>
            <span class="toplist-order"> {{ step.steps }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
let getUserWeeklyStatsData = useState("getUserWeeklyStatsState");

onMounted(async () => {
  getUserWeeklyStatsData.value = await getUserWeeklyStats();
});
</script>
