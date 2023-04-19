<!-- pages/reset-password.vue -->
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
        <form @submit.prevent="resetPassword">
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
      <button type="submit" class="button-submit" aria-label="Reset password button">
        Återställ lösenord
      </button>
    </form>
  </div>
  </div>
  </template>
  <script setup>
  /* initiate variables */
  const email = ref("");
  const errorMsg = ref("");
  const successMsg = ref("");
  const { auth } = useSupabaseClient(); 
  
  /* function to reset password */
  const resetPassword = async () => {
    try {
      const { error } = await auth.api.resetPasswordForEmail(email.value);
      if (error) throw error;
      successMsg.value = "Ett e-postmeddelande har skickats för att återställa ditt lösenord.";
      setTimeout(() => {
        successMsg.value = "";
      }, 8000);
    } catch (error) {
      errorMsg.value = "Det uppstod ett problem vid återställning av lösenordet. Försök igen senare.";
      setTimeout(() => {
        errorMsg.value = "";
      }, 8000);
    }
  };
  
  // define page meta
  definePageMeta({
    layout: "",
  });
  </script>
  