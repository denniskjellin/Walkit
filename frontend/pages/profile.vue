<!-- pages/index.vue -->
<template>
  <ProfileHeroImg />
  <div class="profile-section-block user-info">
    <div class="container-circle-profile circle-profile">
      <h2 class="h1-s forest">{{ userInitials(userData.full_name) }}</h2>
    </div>
    <p>{{ userData.full_name }}</p>
    <p>{{ user.email }}</p>
  </div>
  <SummaryCirclesProfile />
</template>

<script setup>
// const { auth } = useSupabaseAuthClient();
const user = useSupabaseUser();

const { data: userData } = await useAsyncData("user", () => getUser());

function userInitials(name) {
  const names = name.split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
}

// Logout the user
const userLogout = async () => {
  // Sign out the user
  await auth.signOut();

  // Redirect to the login page if the user is not signed in
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });
  // Redirect to the home page if the user is signed in
};

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style lang="scss" scoped></style>
