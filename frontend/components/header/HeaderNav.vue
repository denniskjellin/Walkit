<template>
  <header>
    <nav class="main-header">
      <div class="profile-container">
        <NuxtLink to="/profile" title="Profile page">
        <div class="child">
          <div class="user-circle"><p>{{ userInitials(user.full_name) }}</p></div>
        </div>
        </NuxtLink>
        <p class="menu-text">{{ userFirst(user.full_name)}}</p>
      </div>
      <NuxtLink to="/" class="walkit-logo">
        <LogosLogoMain />
      </NuxtLink>
      <div class="menu-foldouts">
        <!-- Add steps form component, icon in the navbar is inside AddStepsComponent-->
        <HeaderAddSteps />
        <!-- Hamburger Menu, links is inside the component for navigation through the fold-out menu -->
        <HeaderHamurgerMenu />
      </div>
    </nav>
  </header>
</template>

<script setup>

const { data: user } = await useAsyncData("user", () => getUser());

function userInitials(name) {
  const names = name.split(" ");
  return names[0].charAt(0) + names[1].charAt(0);
}

function userFirst(name) {
  const names = name.split(" ");
  return names[0];
}




</script>

<style lang="css" scoped></style>

