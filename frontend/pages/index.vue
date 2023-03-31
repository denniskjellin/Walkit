<!-- pages/index.vue -->
<template>
<div class="border-2 border-green-600">
  <h1>Hey boy</h1>

</div>
    
  </template>

<script setup>
  const user = useSupabaseUser();

      // Redirect to the login page if the user is not signed in
      watchEffect(() => {
      if (!user.value) {
        return navigateTo("/login");
      }
    });
    // Redirect to the home page if the user is signed in
    definePageMeta({
      middleware: "auth",
      layout: "default"
    }); 
</script>

<style lang="scss" scoped>

</style>