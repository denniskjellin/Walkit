<!-- pages/login.vue -->
<template>
  <!-- insert knowit colors here -->
  <div
    class="main-container bg-gradient-to-r from-primaforest-300 via-primaforest-500 to-primaforest-700"
  >
    <div class="child-container">
      <div class="walkit-logo">
        <LogosLogoSec />
        <!-- Svg logo component -->
      </div>
      <!-- form with function userLogin -->
      <form @submit.prevent="userLogin">
        <div v-if="errorMsg" class="error-box">
          {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="success-box">
          {{ successMsg }}
        </div>

        <div class="input-section">
          <label for="email"> E-post </label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Knowit@gmail.com"
            aria-label="Email address"
            required
          />
        </div>
        <div class="input-section password">
          <label for="password"> Lösenord </label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Lösenord"
            aria-label="Password"
            required
          />
        </div>
        <button type="submit" class="button-submit" aria-label="Login button">
          <i class="fa fa-sign-in-alt"></i> Logga in
        </button>
      </form>
      <div class="register-section">
        <p>Har du inget konto?</p>
        <NuxtLink to="/register" aria-label="Link to register page"
          >Registrera</NuxtLink
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
const successMsg = ref("");
/* const { auth } = useSupabaseAuthClient(); */
const { auth } = useSupabaseClient(); // or useSupabaseClient();

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
