<template>
  <div class="body">
    <h1 class="h2-s">Uppdatera lösenord</h1>
    <form @submit.prevent="updatePassword" class="form">
      <div class="input-section">
        <label for="password">Lösenord</label>
        <input
          class="input-form"
          type="password"
          id="password"
          v-model="password"
          placeholder="Nytt lösenord"
        />
      </div>
      <div class="input-section">
        <label for="confirmPassword">Konfirmera lösenord</label>
        <input
          class="input-form"
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Konfirmera lösenord"
        />
      </div>
      <!-- success msg div, aria assertive - screenread reads this msg when if it triggers -->
      <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
        <p v-if="errorMsg" class="error-box">
          {{ errorMsg }}
        </p>
        <p v-if="successMsg" class="success-box">
          {{ successMsg }}
        </p>
      </div>
      <div class="input-label-container">
        <button type="submit" class="btn-primary btn-forest">
          Uppdatera lösenord <i class="fas fa-undo"></i>

        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// update password
let supabase = useSupabaseClient();
let router = useRouter();
let password = ref("");
let confirmPassword = ref("");

// validation
let errorMsg = ref("");
let successMsg = ref("");

// update password function
const updatePassword = async () => {
  // check if passwords match
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Lösenorden matchar inte.";
    return;
  }

  // update password
  const { error } = await supabase.auth.updateUser({
    password: password.value,
  });

  // check for errors
  if (error) {
    errorMsg.value = "Gick ej att uppdatera lösenordet.";
  } else {
    successMsg.value = "Lösenordet har uppdaterats.";
    setTimeout(() => {
      router.push("/profile");
    }, 1000);	
  }
};


const user = useSupabaseUser();
// Redirect to the login page if the user is not signed in
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/login");
  }
});


</script>

<style lang="scss" scoped></style>
