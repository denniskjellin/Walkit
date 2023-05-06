<!-- pages/index.vue -->
<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <SummaryCirclesProfile />
  <ProfileWeekStats />
</template>

<script setup>
// // const { auth } = useSupabaseAuthClient();
// const user = useSupabaseUser();

// // Logout the user
// const userLogout = async () => {
//   // Sign out the user
//   await auth.signOut();

//   // Redirect to the login page if the user is not signed in
//   watchEffect(() => {
//     if (!user.value) {
//       return navigateTo("/login");
//     }
//   });
//   // Redirect to the home page if the user is signed in
// };

// definePageMeta({
//   middleware: "auth",
//   layout: "default",
// });

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
