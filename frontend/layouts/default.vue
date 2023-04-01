<template>
  <div class="flex flex-col h-screen"> 
    
    <!--Import of Header Navigation-->
    <!-- <Nav /> -->
 <HeaderNavComp />
    <main class="flex-grow py-8 border-2">
      <!--Output the page content-->
      <slot></slot>
    </main>

    <!--Import of Footer-->
    <!-- <Footer /> -->
  </div>
</template>

<script>
/* Placeholder */
</script>

<style scoped>
/* Placeholder */
</style>
