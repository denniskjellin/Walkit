<template>
  <section
    class="section-block section-big-bg-clay"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Vecko statistik</h2>
    <section
      class="datalist-wrapper profile-weekly-stats"
      aria-label="Steg per dag för pågående vecka"
    >
      <SvgTopListIco class="datalist-ico" />
      <template v-if="getUserWeeklyStatsData">
        <h2 class="h2-s">
          Dina steg vecka {{ getUserWeeklyStatsData?.currentWeekNumber }}
        </h2>
        <div class="datalist-header">
          <div>Datum</div>
          <div class="datalist-header-steps">Antal steg</div>
        </div>
        <ul class="datalist-list">
          <li
            class="datalist-item"
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
        aria-live="assertive"
      >
        {{ getUserWeeklyStatsData.errorMsg }}
      </p>
    </section>
  </section>
</template>

<script setup>
let getUserWeeklyStatsData = useState("getUserWeeklyStatsState");
onMounted(async () => {
  getUserWeeklyStatsData.value = await getUserWeeklyStats();
});
</script>
