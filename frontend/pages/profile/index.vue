<!-- pages/index.vue -->
<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <ProfileSummaryCirclesProfile />
  <!-- <ProfileWeekStats /> -->
  <ProfileStepsEditTable />
</template>

<script setup>
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

<style lang="scss" scoped></style>
