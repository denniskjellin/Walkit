<template>
  <div
    class="main-container"
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
            aria-label="E-post adress"
            required
          />
        </div>
        <button
          type="submit"
          class="button-submit"
          aria-label="Återställ lösenord"
        >
          Återställ lösenord
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
/* initiate variables */
const supabase = useSupabaseClient();
const email = ref("");
const errorMsg = ref("");
const successMsg = ref("");

// reset password
const resetPassword = async () => {
  // check if email is empty
  if (!email.value) {
    errorMsg.value = "Vänligen ange en e-postadress.";
    return;
  }

  // reset password
  const { error } = await supabase.auth.resetPasswordForEmail(email.value);

  // check for errors
  if (error) {
    errorMsg.value = "Gick ej att återställa lösenordet.";
  } else {
    successMsg.value = "Lösenordet har återställts. Vänligen kolla din e-post.";
  }
};

// define page meta
definePageMeta({
  layout: "",
});
</script>

<style lang="scss" scoped></style>
