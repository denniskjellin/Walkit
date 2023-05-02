<template>
  <div class="profile-section-block user-info">
    <div class="container-circle-profile circle-profile">
      <h1 class="h1-s forest">{{ userInitials(userData.full_name) }}</h1>
    </div>
    <p>{{ userData.full_name }}</p>
    <p>{{ user.email }}</p>
  </div>
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
