<template>
  <!-- Hamburger button and close button for menu -->
  <div v-if="!isOpen">
    <button id="menu-button" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <i class="fas fa-bars"></i>
    </button>
    <p class="menu-text">Meny</p>
  </div>
  <!-- If hamburer nav is open, show the close button -->
  <div v-else >
    <button id="menu-button" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <i class="fas fa-times"></i>
    </button>
    <p class="menu-text">Stäng</p>
  </div>

  <!-- This is the grey-out div, addition css in HeaderNavComp -->
  <div v-if="isOpen" class="grey-out"></div>

  <!-- Styling for fold-out menu, additional CSS in @HeaderNavComp.css, Pink-svg line @PinkLineComp -->
  <div
    ref="main-nav"
    id="fold-out-menu"
    class="fold-out-menu"
    :class="{ hidden: !isOpen, block: !isOpen }"
    aria-labelledby="menu-label"
  >
    <div id="menu-label" class="sr-only">Huvudmeny</div>
    <a
      href="#"
      id="profil-menu-item"
      class="nav-links"
      >Profil</a
    >
    <hr class="pink-line" />
    <a class="nav-links" href="#"
      >Aktivitetslista</a
    >
    <hr class="pink-line" />
    <a href="#" class="nav-links">Om</a>
    <hr class="pink-line" />
    <a href="#" class="nav-logout"
      >Logga ut</a
    >
    <hr />
  </div>
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
