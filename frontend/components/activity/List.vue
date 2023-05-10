<template>
  <section
    class="section-block section-big-bg-clay"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Aktivitetsslista</h2>
    <template v-if="activityListData?.activities">
      <section class="datalist-wrapper" aria-label="toplista över mest steg">
        <SvgGoalprogIco lass="datalist-ico" />
        <div class="datalist-header">
          <div>
            <div class="datalist-header-steps bold"><p>Aktivitet</p></div>
          </div>
          <div class="datalist-header-steps bold"><p>30 min</p></div>
        </div>

        <ul class="datalist-list">
          <li
            class="datalist-item"
            v-for="(item, index) in activityListData.activities"
            :key="`toplist-${index}`"
          >
            <span>
              {{ item.activity }}
            </span>
            {{ numberToSweString(item.step_value) }}
          </li>
        </ul>
      </section>
    </template>
    <p v-else>Laddar...</p>
    <!-- if error msg, show -->
    <p
      v-if="activityListData?.errorMsg"
      class="error-box center"
      aria-live="assertive"
    >
      {{ activityListData.errorMsg }}
    </p>
  </section>
</template>

<script setup>
let activityListData = useState("activityListState");

onMounted(async () => {
  activityListData.value = await getAllActivities();
});
</script>

<style lang="scss" scoped></style>
