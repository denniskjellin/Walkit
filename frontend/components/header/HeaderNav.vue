<template>
  <header>
    <nav class="main-header">
      <div class="profile-container">
        <NuxtLink to="/" title="Profile page"
          ><i class="fas fa-user"></i>
        </NuxtLink>
        <p class="menu-text">Profil</p>
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

<script>

</script>

<style lang="css" scoped></style>
