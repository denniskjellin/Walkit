<!-- pages/register.vue -->
<template>
  <!-- Register form -->
  <div
    class="main-container bg-gradient-to-r from-primaforest-300 via-primaforest-500 to-primaforest-700 px-4 sm:px-6 lg:px-8"
  >
    <div class="child-container">
      <div class="walkit-logo">
        <LogoDetailComp />
        <!-- Svg logo component -->
      </div>
      <!-- form with function useRegister -->
      <form @submit.prevent="userRegister">
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
        <div class="input-section">
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
        <div class="input-section password">
          <label for="confirmPassword"> Bekräfta lösenord </label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Bekräfta lösenord"
            aria-label="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="button-submit" aria-label="Sign up">
          <i class="fa fa-user-plus"></i> Skapa konto
        </button>
      </form>
      <div class="register-section">
        <p class="text-gray-700">Redan registrerad?</p>
        <NuxtLink
          to="/login"
          aria-label="Sign in"
          >Logga in</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

/* initiate variabels */
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const { auth } = useSupabaseAuthClient();
const router = useRouter();

/* function to register user */
const userRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Lösenorden matchar inte!";
    password.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
    return;
  }
  try {
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
    });
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    if (error) throw error;

    // show success message for 2 seconds before redirecting to login page
    successMsg.value = "Du har registrerat dig!";
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
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
