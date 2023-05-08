<template>
  <section
    class="profile-section-block user-info"
    aria-label="Användarinformation"
  >
    <h1 class="visually-hidden">Användarinformation</h1>
    <div class="container-circle-profile circle-profile">
      <NuxtLink aria-label="Min profil" to="/profile/steps">
        <h2 class="h1-s forest">{{ userInitials(userData?.full_name) }}</h2>
      </NuxtLink>
    </div>
    <p>{{ userData?.full_name }}</p>
    <p>{{ user?.email }}</p>
  </section>
</template>

<script setup>
// const { auth } = useSupabaseAuthClient();
const user = useSupabaseUser();

const { data: userData } = await useAsyncData("user", () => getUser());

function userInitials(name) {
  const names = name.split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
}
</script>

<style lang="scss" scoped></style>
