<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <StepsEditTable />
</template>

<script setup lang="ts">
import StepsEditTable from '~~/components/profile/StepsEditTable.vue';


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
