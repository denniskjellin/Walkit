<template>
  <section
    class="section-block section-big-bg-clay"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Redigera vecko statistik</h2>

    <section
      class="datalist-wrapper profile-weekly-stats"
      aria-label="Steg per dag för pågående vecka"
    >
      <SvgTopListIco class="datalist-ico" />
      <template v-if="userStepsEntryData">
        <h2 class="h2-s">Alla dina steg</h2>

        <div class="datalist-header">
          <div>Datum</div>
          <div>Antal steg</div>
          <div>Redigera</div>
        </div>
        <ul class="datalist-list">
          <li
            class="datalist-item"
            v-for="(entry, index) in userStepsEntryData?.userStepsEntrys"
            :key="index"
          >
            {{ entry.date }}
            <span>{{ numberToSweString(entry?.steps) }}</span>
            <NuxtLink :to="`/profile/steps/${entry.id}`">
              Redigera <i class="fas fa-edit"></i>
            </NuxtLink>
          </li>
        </ul>
      </template>
      <p v-else>Laddar...</p>
      <!-- error msg div, aria assertive  -->

      <p
        role="alert"
        aria-live="assertive"
        v-if="userStepsEntryData?.errorMsg"
        class="error-box"
      >
        {{ userStepsEntryData.errorMsg }}
      </p>
    </section>
  </section>
</template>

<script setup>
let userStepsEntryData = useState("userStepsEntryState");

onMounted(async () => {
  userStepsEntryData.value = await getAllUserStepsEntry();
});
</script>
