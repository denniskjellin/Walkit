<template>
  <div class="admin-page">
    <ProfileHeroImg />
    <section class="section-block">
      <h1 class="h1-s">Kontrollpanel</h1>
      <div class="card-wrapper">
        <NuxtLink to="/admin/destinationer">
          <div class="card">
            <h2 class="h2-s">Destinationer</h2>
            <span><SvgGoalblockIco class="icon-card" /></span>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/aktivitetshantering">
          <div class="card">
            <h2 class="h2-s">Aktivitetslista</h2>
            <span><SvgGoalprogIco class="icon-card" /></span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
// Redirect to the login page if the user is not signed in
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/login");
  }
});
</script>
