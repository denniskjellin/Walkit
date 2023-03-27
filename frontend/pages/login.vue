<!-- pages/login.vue -->
<template>
  <!-- insert knowit colors here -->
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaforest-300 via-primaforest-500 to-primaforest-700 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-primapebble-300 w-full max-w-md rounded-lg shadow-lg overflow-hidden"
    >
      <div class="px-6 py-8">
        <div class="flex justify-center items-center">
          <h1 class="mb-5">
            <LogoDetailComp />
            <!-- Svg logo component -->
          </h1>
        </div>
        <!-- form with function userLogin -->
        <form @submit.prevent="userLogin">
          <div
            v-if="errorMsg"
            class="mt-4 border-2 bg-red-100 border-red-400 text-red-700 p-2 mb-2"
          >
            {{ errorMsg }}
          </div>
          <div
            v-if="successMsg"
            class="mt-4 border-2 border-green-500 bg-green-100 text-green-700 p-2 mb-2"
          >
            {{ successMsg }}
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              E-post
            </label>
            <input
              v-model="email"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Knowit@gmail.com"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Lösenord
            </label>
            <input
              v-model="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Lösenord"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primapear-800 hover:bg-primapear-900 transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <i class="fa fa-sign-in-alt mr-2"></i> Logga in
          </button>
        </form>
        <div class="mt-8 text-center">
          <p class="text-gray-700">Har du inget konto?</p>
          <NuxtLink
            to="/register"
            class="font-bold text-primapear-800 hover:primapear-900 transition duration-500 ease-in-out"
            >Registrera</NuxtLink
          >
        </div>
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
const successMsg = ref('');
const { auth } = useSupabaseAuthClient();

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
</script>
