<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <ProfileStepsEditTable />
</template>

<script setup lang="ts">



const user = useSupabaseUser();
// Redirect to the login page if the user is not signed in
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/login");
  }
});

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style scoped></style>
