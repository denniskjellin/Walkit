<template>
  <section
    class="section-block section-big-bg-clay"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Vecko statistik</h2>
    <section class="datalist-wrapper" aria-label="toplista över mest steg">
      <SvgTopListIco class="datalist-ico" />
      <div class="datalist-header">
        <div>
          <div class="datalist-header-steps bold"><p>Aktivitet</p></div>
        </div>
        <div class="datalist-header-steps bold"><p>30 min</p></div>
      </div>
      <ul class="datalist-list">
        <li
          class="datalist-item"
          v-for="(item, index) in activityList"
          :key="`toplist-${index}`"
        >
          <div>
            <span class="datalist-order">{{ index + 1 }}</span>
            {{ item.activity }}
          </div>
          {{ item.step_value }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>




</script>

<style lang="scss" scoped></style>
