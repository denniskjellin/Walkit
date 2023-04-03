<!-- This component is imported in HeaderNavComponent, its extra CSS lies in HeaderNavComp.css -->
<template>
  <!-- Fold out form add Steps -->
  <div v-if="!isOpen" class="flex flex-col items-center justify-between">
    <button @click="($event) => (isOpen = !isOpen)" :aria-expanded="isOpen">
      <i class="text-primaloli-500 fas fa-plus"></i>
    </button>
    <p class="hidden md:block">Lägg till</p>
  </div>
  <!-- If Add steps is open, show the close button -->
  <div v-else class="flex flex-col items-center justify-between">
    <button id="menu-button" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <i class="fas fa-times"></i>
    </button>
    <p class="hidden md:block">Stäng</p>
  </div>
  <!-- End of fould-out for adding steps -->

  <!-- Fold out add Steps menu -->
  <div
    ref="main-nav"
    class="fold-out-steps bg-primasand-500 text-center shadow-md"
    :class="{ hidden: !isOpen, block: !isOpen }"
  >
    <div>Add steps</div>
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

  <!-- This is the grey-out div, addition css in HeaderNavComp -->
  <div v-if="isOpen" class="grey-out top-20"></div>
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
