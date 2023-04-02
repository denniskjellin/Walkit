<template>
  <header>
    <nav class="z-99 h-20 grid grid-cols-8 py-0 bg-primasand-500">
      <div
        class="col-span-2 flex flex-col items-center place-self-center justify-between"
      >
        <NuxtLink to="/" title="Profile page"
          ><i class="fas fa-user"></i>
        </NuxtLink>
        <p class="hidden md:block">Profil</p>
      </div>
      <NuxtLink to="/" class="col-span-4 place-self-center main-logo">
        <img src="../media/mainlogo.svg" alt="logotype Walkit" />
      </NuxtLink>
      <div class="col-span-2 flex place-self-center gap-6">
        <div class="flex flex-col items-center justify-between">
          <NuxtLink to="/" title="Profile page"
            ><i class="fas fa-plus"></i>
          </NuxtLink>
          <p class="hidden md:block">Lägg till</p>
        </div>

        <div v-if="!isOpen" class="flex flex-col items-center justify-between">
          <button
            id="menu-button"
            @click="isOpen = !isOpen"
            :aria-expanded="isOpen"
          >
            <i class="fas fa-bars"></i>
          </button>
          <p class="hidden md:block">Meny</p>
        </div>
        <div v-else class="flex flex-col items-center justify-between">
          <button
            id="menu-button"
            @click="isOpen = !isOpen"
            :aria-expanded="isOpen"
          >
            <i class="fas fa-times"></i>
          </button>
          <p class="hidden md:block">Stäng</p>
        </div>
      </div>

      <!-- This is the grey-out div, addition css in HeaderNavComp -->
      <div v-if="isOpen" class="grey-out top-20 z-1"></div>

      <!-- Styling for fold-out menu, additional CSS in @HeaderNavComp.css, Pink-svg line @PinkLineComp -->
      <div
        ref="main-nav"
        id="fold-out-menu"
        class="nav-menu fold-out-menu bg-primasand-500 text-center shadow-md z-2"
        :class="{ hidden: !isOpen, block: !isOpen }"
        aria-labelledby="menu-label"
      >
        <div id="menu-label" class="sr-only">Huvudmeny</div>
        <a
          href="#"
          id="profil-menu-item"
          class="block leading-6 font-normal font-xl py-6"
          >Profil</a
        >
        <hr class="pink-line" />
        <a href="#" class="block leading-6 font-normal font-xl py-6"
          >Aktivitetslista</a
        >
        <hr class="pink-line" />
        <a href="#" class="block leading-6 font-normal font-xl py-6">Om</a>
        <hr class="pink-line" />
        <a href="#" class="block leading-6 font-normal font-xl mt-24 mb-10"
          >Logga ut</a
        >
        <hr />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      listenerActivated: false,
    };
  },
  watch: {
    // watch for changes in isOpen
    isOpen() {
      if (this.isOpen && !this.listenerActivated) {
        setTimeout(() => {
          document.addEventListener("click", this.closeMenu);
          this.listenerActivated = true;
        }, 200);
        // if isOpen is false and listener is activated, remove listener
      } else if (!this.isOpen && this.listenerActivated) {
        setTimeout(() => {
          document.removeEventListener("click", this.closeMenu);
          this.listenerActivated = false;
        }, 200);
      }
    },
  },
  // close menu if click outside of menu
  methods: {
    closeMenu(e) {
      const menu = this.$refs["main-nav"];
      if (menu && !menu.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
