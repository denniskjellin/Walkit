<!-- This component is imported in HeaderNavComponent, its extra CSS lies in HeaderNavComp.css -->
<template>
  <!-- Fold out form add Steps -->
  <div v-if="!isOpen" class="child">
    <button @click="($event) => (isOpen = !isOpen)" :aria-expanded="isOpen">
      <i class="fas fa-plus"></i>
    </button>
    <p class="menu-text">Lägg till</p>
  </div>
  <!-- If Add steps is open, show the close button -->
  <div v-else class="child">
    <button id="menu-button" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <i class="fas fa-times"></i>
    </button>
    <p class="menu-text">Stäng</p>
  </div>
  <!-- End of fould-out for adding steps -->

  <!-- Fold out add Steps menu -->
  <div
    ref="main-nav"
    class="fold-out-menu addsteps"
    :class="{ hidden: !isOpen, block: !isOpen }"
  >
    <div>Add steps</div>
  </div>

  <!-- This is the grey-out div, addition css in HeaderNavComp -->
  <div v-if="isOpen" class="grey-out"></div>
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
