<!-- pages/index.vue -->
<template>
    <div
      class="grid h-screen place-items-center bg-gradient-to-tr from-green-900 via-gray-900 to-green-900"
    >
      <section class="rounded-3xl border border-gray-700 bg-gray-900 text-gray-400 shadow-2xl">
        <div class="container mx-auto flex flex-col items-center px-12 py-24 md:flex-row">
          <div
            class="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24"
          >
            <h1 class="title-font mb-4 text-3xl font-medium text-white sm:text-4xl">
              This is index.vue
            </h1>
            <p class="mb-8 leading-relaxed">This project is a Vue.js application using Nuxt 3.</p>
          </div>
        </div>
      </section>
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
    }); 
</script>

<style lang="scss" scoped>

</style>