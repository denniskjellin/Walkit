<template>
  <!-- content wrapper, pushes footer to bottom -->
  <div class="wrapper">
    <!--Import of Header Navigation-->
    <HeaderNav />
    <main>
      <!--Output the page content-->
      <slot></slot>
    </main>
    <!--Import of Footer-->
    <Footer />
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Placeholder */
</style>
