<template>
  <section
    class="profile-section-block week-stats"
    aria-label="Statistik för pågående vecka"
  >
    <h2 class="visually-hidden">Redigera vecko statistik</h2>

    <section
      class="toplist-wrapper profile-weekly-stats"
      aria-label="Steg per dag för pågående vecka"
    >
      <SvgTopListIco class="top-list-ico" />
      <template v-if="userStepsEntrys">
        <h2 class="h2-s">Alla dina steg</h2>

        <div class="toplist-header">
          <div>Datum</div>
          <div>Antal steg</div>
          <div class="toplist-header-steps">Redigera</div>
        </div>
        <ul class="toplist-list">
          <li
            class="toplist-item"
            v-for="(entry, index) in userStepsEntrys"
            :key="index"
          >
            {{ entry?.date }}
            <span>{{ numberToSweString(entry.steps) }}</span>
            <NuxtLink :to="`/profile/steps/${entry.id}`">
              Redigera <i class="fas fa-edit"></i>
            </NuxtLink>
          </li>
        </ul>
        <!-- error msg div, aria assertive  -->
        <div v-if="errorMsg" role="alert" aria-live="assertive">
          <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
        </div>
      </template>
      <p v-else>Laddar...</p>
    </section>
  </section>
</template>

<script setup>
const supabase = useSupabaseClient();
let errorMsg = ref("");
let userStepsEntrys = ref([]);

const getAllUserStepsEntrys = async () => {
  // Get the user ID
  const user = useSupabaseUser();
  const { id: user_id } = user.value;
  if (!user.value) {
    throw new Error("User not logged in");
  }

  try {
    const { data: userSteps, error } = await supabase
      .from("steps")
      .select("id, steps, date")
      .eq("user_id", user_id)
      .order("date", { ascending: false });
    if (error) {
      throw new Error((errorMsg.value = "Ops, något gick fel!"));
    }

    userStepsEntrys.value = userSteps.map((step) => ({ ...step, user_id }));
  } catch (error) {
    errorMsg.value = "Ops, något gick fel!";
  }
};

getAllUserStepsEntrys();

onMounted(async () => {
  await getAllUserStepsEntrys();
});
</script>
