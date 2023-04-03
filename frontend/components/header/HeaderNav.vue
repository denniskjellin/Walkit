<template>
  <header>
    <nav class="h-20 grid grid-cols-8 py-0 bg-primasand-500">
      <div
        class="col-span-2 flex flex-col items-center place-self-center justify-between"
      >
        <NuxtLink to="/" title="Profile page"
          ><i class="fas fa-user"></i>
        </NuxtLink>
        <p class="hidden md:block">Profil</p>
      </div>
      <NuxtLink to="/" class="col-span-4 place-self-center main-logo">
        <img src="~/../../media/mainlogo.svg" alt="logotype Walkit" />
      </NuxtLink>
      <div class="col-span-2 flex place-self-center gap-6">
        <!-- Add steps form component, icon in the navbar is inside AddStepsComponent-->
        <HeaderAddSteps />
        <!-- Hamburger Menu, links is inside the component for navigation through the fold-out menu -->
        <HeaderHamurgerMenu />
      </div>
    </nav>
  </header>
</template>

<script></script>

<style lang="css" scoped></style>
