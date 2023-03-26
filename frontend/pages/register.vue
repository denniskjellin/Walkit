<!-- pages/register.vue -->
<template>
  <!-- Register form -->
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primaforest-300 via-primaforest-500 to-primaforest-700 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-primapebble-300 w-full max-w-md rounded-lg shadow-lg overflow-hidden"
    >
      <div class="px-6 py-8">
        <div class="flex justify-center items-center">
          <h1 class="mb-5"><LogoDetailComp /></h1>
          <!-- Svg logo component -->
        </div>
        <!-- form with function useRegister -->
        <form @submit.prevent="userRegister">
          <div class="mt-4 text-red-500">{{ errorMsg }}</div>
          <div class="mt-4 text-green-500">{{ successMsg }}</div>
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
          <div class="mb-4">
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
          <div class="mb-6">
            <label
              class="block text-gray-700 font-bold mb-2"
              for="confirmPassword"
            >
              Bekräfta lösenord
            </label>
            <input
              v-model="confirmPassword"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Bekräfta lösenord"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primapear-800 hover:bg-primapear-900 transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <i class="fa fa-user-plus mr-2"></i> Skapa konto
          </button>
        </form>
        <div class="mt-8 text-center">
          <p class="text-gray-700">Redan registrerad?</p>
          <NuxtLink
            to="/login"
            class="font-bold text-primapear-800 hover:text-primapear-900 transition duration-500 ease-in-out"
            >Logga in</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

/* initiate variabels */
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const { auth } = useSupabaseAuthClient();
const router = useRouter()

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
      router.push('/login')
    }, 2000)
    
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
</script>

