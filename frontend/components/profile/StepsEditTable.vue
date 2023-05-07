<template>
  <section
    class="profile-section-block week-stats"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Redigera vecko statistik</h2>
    <section
      class="toplist-wrapper profile-weekly-stats"
      aria-label="Steg per dag för pågående vecka"
    >
      <SvgTopListIco class="top-list-ico" />
      <template v-if="getUserWeeklyStatsData">
        <h2 class="h2-s">
          Dina steg vecka {{ getUserWeeklyStatsData?.currentWeekNumber }}
        </h2>
        <div class="toplist-header">
          <div>Datum</div>
          <div>Antal steg</div>
          <div class="toplist-header-steps">Redigera</div>
        </div>
        <ul class="toplist-list">
          <li
            class="toplist-item"
            v-for="(dailyStepData, index) in getUserWeeklyStatsData?.dailySteps"
            :key="index"
          >
            {{ dailyStepData.date }}
            <template v-if="dailyStepData.steps !== 0">
              <span>{{ numberToSweString(dailyStepData?.steps) }}</span>
              <NuxtLink :to="`/profile/steps/${dailyStepData.id}`">
                Redigera <i class="fas fa-edit"></i>
              </NuxtLink>
            </template>
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
