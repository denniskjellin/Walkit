<template>
  <header>
  <nav
    class="shadow-md flex relative items-center justify-between flex-wrap bg-primasand-500 py-6"
  >
    <div class="flex items-center">
      <!-- custom placeholder for user initials -->
      <span class="profile-circle">DK</span>
    </div>
    <div class="logo-header">
      <!-- import of Walkit svg logotype -->
      <LogosLogoHeaderComp />
    </div>
    <!-- add svg-icon for steps (X) -->
    <div class="absolute right-14 md:right-28">
      <button class="addStepsBtn py-2">  <!---right now this button is empty, gives validation error, come back to fix this -->
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_652_16280)">
          <path
            d="M21.0464 12.5615H13.4849V5H12.6123V12.5615H5.05078V13.4341H12.6123V21H13.4849V13.4341H21.0464V12.5615Z"
            fill="#FF00FF"
          />
        </g>
        <circle cx="13" cy="13" r="12.5" stroke="#333333" />
        <defs>
          <clipPath id="clip0_652_16280">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(5.05078 5)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
    </div>
    <!-- button in navbar with is open event -->
    <button id="menu-button" class="flex items-center mr-3 md:mr-16 rounded" @click="isOpen = !isOpen" :aria-expanded="isOpen">
      <!-- svg hamburger nav -->
      <svg
        v-if="!isOpen"
        width="26"
        height="16"
        viewBox="0 0 26 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Open menu"
      >
        <title>Open</title>
        <path d="M26 7.3064H0V8.70073H26V7.3064Z" fill="#333333" />
        <path d="M26 0H0V1.39434H26V0Z" fill="#333333" />
        <path d="M26 14.6057H0V16H26V14.6057Z" fill="#333333" />
        <title>Menu</title>
        <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" />
      </svg>

      <!-- svg cross (X)  -->
      <svg
        v-if="isOpen"
        width="23"
        height="16"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Close menu"
      >
        <title>Close</title>
        <path
          d="M13.9319 12.7465L12.7383 13.9402L21.7981 23L22.9917 21.8063L13.9319 12.7465Z"
          fill="#333333"
        />
        <path
          d="M1.19365 0.00605891L0 1.19971L9.00608 10.2058L10.1997 9.01213L1.19365 0.00605891Z"
          fill="#333333"
        />
        <path
          d="M21.802 2.02296e-05L0 21.802L1.19365 22.9957L22.9956 1.19367L21.802 2.02296e-05Z"
          fill="#333333"
        />
      </svg>
    </button>

    <!-- Styling for fold-out menu, additional CSS in @HeaderNavComp.css, Pink-svg line @PinkLineComp -->
    <div
  ref="main-nav"
  class="fold-out-menu bg-primasand-500 text-center shadow-md"
  :class="{ hidden: !isOpen, block: !isOpen }"
  aria-labelledby="menu-button"
>
      <a href="#" class="block leading-6 font-normal font-xl py-6">Profil</a>
      <IconPinkLineComp />
      <a href="#" class="block leading-6 font-normal font-xl py-6"
        >Aktivitetslista</a
      >
      <IconPinkLineComp />
      <a href="#" class="block leading-6 font-normal font-xl py-6">Om</a>
      <IconPinkLineComp />
      <a href="#" class="block leading-6 font-normal font-xl mt-24 mb-10">Logga ut</a>
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
