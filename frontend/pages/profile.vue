<!-- pages/index.vue -->
<template>
  <section v-if="user" class="mt-10 flex justify-center">
    <div>
      <button
        @click="userLogout"
        class="mt-8 rounded-md bg-[#42b883] px-4 py-2 font-sans font-bold text-[#213547] transition-colors duration-500 hover:bg-[#42d392] focus:outline-none"
      >
        logout
      </button>
    </div>
  </section>
</template>

<script setup>
const { auth } = useSupabaseAuthClient();
const user = useSupabaseUser();

// Logout the user
const userLogout = async () => {
  // Sign out the user
  await auth.signOut();

  // Redirect to the login page if the user is not signed in
  watchEffect(() => {
    if (!user.value) {
      return navigateTo("/login");
    }
  });
  // Redirect to the home page if the user is signed in
};

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style lang="scss" scoped></style>
