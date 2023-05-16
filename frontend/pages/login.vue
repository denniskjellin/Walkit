<!-- pages/login.vue -->
<template>
  <!-- insert knowit colors here -->
  <div
    class="main-container"
  >
    <div class="child-container">
      <div class="walkit-logo">
        <LogosLogoSec />
        <!-- Svg logo component -->
      </div>
      <!-- form with function userLogin -->
      <form @submit.prevent="userLogin" aria-label="Logga in formulär">
        <div
          v-if="errorMsg"
          class="error-box"
          role="alert"
          aria-live="assertive"
        >
          {{ errorMsg }}
        </div>

        <div class="input-section">
          <label class="label-loginreg" for="email"> E-post </label>
          <input
            class="input-loginreg"
            v-model="email"
            id="email"
            type="email"
            placeholder="Knowit@gmail.com"
            aria-label="E-post adress"
            required
          />
        </div>
        <div class="input-section password">
          <label class="label-loginreg" for="password"> Lösenord </label>
          <input
            class="input-loginreg"
            v-model="password"
            id="password"
            type="password"
            placeholder="Lösenord"
            aria-label="Lösenord"
            required
          />
        </div>
        <div class="submit-button-container">
        <button type="submit" class="button-submit" aria-label="Logga in">
          <i class="fa fa-sign-in-alt"></i> Logga in
        </button>
      </div>
      </form>
      <div class="register-section">
        <p>Har du inget konto?</p>
        <NuxtLink to="/register" aria-label="Registrera dig"
          >Registrera</NuxtLink
        >
      </div>
      <div class="register-section bottom">
        <p>Glömt lösenord?</p>
        <NuxtLink to="/recover" aria-label="Återställ lösenord"
          >Återställ lösenord</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
/* initiate variables */
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const { auth } = useSupabaseClient();

/* function to login user */
const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    email.value = "";
    password.value = "";
    if (error) throw error;
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Felaktigt användarnamn eller lösenord!";
    setTimeout(() => {
      errorMsg.value = "";
    }, 8000);
  }
};
/* watch on change */
watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

// define page meta
definePageMeta({
  layout: "",
});
</script>
