<template>
  <header>
    <nav class="main-header">
      <div class="profile-container">
        <NuxtLink to="/profile" title="Profile page" aria-label="Min sida"
          ><i class="fas fa-user"></i>
        </NuxtLink>
        <p class="menu-text">Profil</p>
      </div>
      <NuxtLink to="/" class="walkit-logo" aria-label="Start">
        <LogosLogoMain />
      </NuxtLink>
      <div class="menu-foldouts">
        <!-- Add steps form component, icon in the navbar is inside AddStepsComponent-->
        <HeaderAddSteps aria-label="Lägg till steg"/>
        <!-- Hamburger Menu, links is inside the component for navigation through the fold-out menu -->
        <HeaderHamurgerMenu aria-label="huvudmeny" />
      </div>
    </nav>
  </header>
</template>

<script>

</script>

<style lang="css" scoped></style>
