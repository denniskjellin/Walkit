<!-- pages/register.vue -->
<template>
  <!-- Register form -->
  <div class="main-container">
    <div class="child-container">
      <div class="walkit-logo">
        <LogosLogoSec />
        <!-- Svg logo component -->
      </div>
      <!-- form with function useRegister -->
      <form @submit.prevent="userRegister" aria-label="Skapa användarkonto">
        <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
          <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
          <p v-if="successMsg" class="success-box">{{ successMsg }}</p>
        </div>
        <div class="input-section">
          <label class="label-loginreg" for="email"> Namn: </label>
          <input
            class="input-loginreg"
            v-model="full_name"
            id="full_name"
            type="text"
            placeholder="Knowit Knowitsson"
            aria-label="Namn"
            required
          />
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
        <div class="input-section">
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
        <div class="input-section password">
          <label class="label-loginreg" for="confirmPassword">
            Bekräfta lösenord
          </label>
          <input
            class="input-loginreg"
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Bekräfta lösenord"
            aria-label="Bekräfta lösenord"
            required
          />
        </div>
        <div class="input-section">
          <input
            class="checkbox-input"
            type="checkbox"
            id="gdpr-checkbox"
            v-model="gdprChecked"
            required
          />
          <label class="checkbox-label gdpr" for="gdpr-checkbox">
            Jag godkänner och samtycker till att mina personuppgifter behandlas
            enligt enligt GDPR.
          </label>
        </div>
        <div class="submit-button-container">
          <button type="submit" class="button-submit" aria-label="Registrera">
            <i class="fa fa-user-plus"></i> Skapa konto
          </button>
        </div>
      </form>
      <div class="register-section">
        <p class="text-gray-700">Redan registrerad?</p>
        <NuxtLink to="/login" aria-label="Logga in">Logga in</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

/* initiate variabels */
const user = useSupabaseUser();
const email = ref("");
const full_name = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const { auth } = useSupabaseAuthClient();
const gdprChecked = ref(false);

/* function to register user */
const userRegister = async () => {
  if (!gdprChecked.value) {
    errorMsg.value =
      "Du måste godkänna användarvillkoren och GDPR för att fortsätta.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Lösenorden matchar inte!";
    password.value = "";
    confirmPassword.value = "";
    return;
  }
  try {
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: full_name.value,
        },
      },
    });

    full_name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    if (error) throw error;

    // show success message for 2 seconds before redirecting to login page
    successMsg.value =
      "Kontot har skapats! Kontrollera din e-post för att verifiera ditt konto.";
    errorMsg.value = "";
  } catch (error) {
    errorMsg.value = "Något gick fel, vänligen försök igen.";
    successMsg.value = "";
  }
};

// redirect to home page if user is logged in
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
