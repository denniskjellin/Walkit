<template>
  <div class="profile-section-block week-stats">
    <div class="toplist-wrapper profile-weekly-stats">
      <SvgTopListIco class="top-list-ico" />
      <template v-if="getUserWeeklyStatsData">
        <h3 class="h2-s">
          Dina steg v.{{ getUserWeeklyStatsData?.currentWeekNumber }}
        </h3>
        <div class="toplist-header">
          <div>Datum</div>
          <div class="toplist-header-steps">Antal steg</div>
        </div>
        <ul class="toplist-list">
          <li
            class="toplist-item"
            v-for="(dailyStepData, index) in getUserWeeklyStatsData?.dailySteps"
            :key="index"
          >
            {{ dailyStepData.date }}

            <span>{{ numberToSweString(dailyStepData.steps) }}</span>
          </li>
        </ul>
      </template>
      <p v-else>Laddar...</p>
      <!-- check for error -->
      <p
        v-if="getUserWeeklyStatsData?.errorMsg"
        class="error-box center"
        role="alert"
        aria-live="assertive"
      >
        {{ getUserWeeklyStatsData.errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup>
let getUserWeeklyStatsData = useState("getUserWeeklyStatsState");
onMounted(async () => {
  getUserWeeklyStatsData.value = await getUserWeeklyStats();
});
</script>
