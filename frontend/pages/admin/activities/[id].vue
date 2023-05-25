<template>
  <div class="container-main-activities">
    <h1 class="h2-s">{{ activities.activity }}</h1>

    <form class="form" aria-label="Lägg till aktivitet">
      <div class="input-section">
        <label class="label-form" for="activity">Aktivitetsnamn:</label>
        <input
          aria-label="Aktivitetsnamn"
          v-model="activity"
          class="input-form"
          type="text"
          id="activity"
          name="activity"
          required
        />
      </div>

      <div class="input-section">
        <label class="label-form" for="step_value"
          >Stegvärde per 30 minut:</label
        >
        <input
          aria-label="Stegvärde per 30 minut"
          v-model="step_value"
          class="input-form"
          type="number"
          min="0"
          id="step_value"
          name="step_value"
          required
        />
      </div>
      <!-- error msg div, aria assertive  -->
      <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
        <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success-box steps">{{ successMsg }}</p>
      </div>

      <!-- add destination button -->
      <button
        @click.prevent="updateActivity"
        class="btn-primary btn-forest"
        aria-label="Lägg till destination"
      >
        Uppdatera <i class="fas fa-sync-alt"></i>
      </button>
      <button
        @click.prevent="deleteActivity"
        class="btn-primary btn-danger btn-margin-top"
        aria-label="Lägg till destination"
      >
        Ta bort <i class="fas fa-trash-alt"></i>
      </button>
    </form>
  </div>
  <div class="back-container">
    <NuxtLink class="back-btn" to="/admin/activities"
      ><i class="fas fa-arrow-left"></i> Tillbaka</NuxtLink
    >
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const { id } = useRoute().params;
const uri = "http://localhost:3000/admin/activities/" + id;
const router = useRouter();

// fetch activities from Supabase
const { data: activities, error } = await supabase
  .from("activities")
  .select("*")
  .eq("id", id)
  .single();

// read in current values from variables
let activity = ref(activities.activity);
let step_value = ref(activities.step_value);

// success/error msg
let errorMsg = ref("");
let successMsg = ref("");

// validation check for form inputs
const validateInput = () => {
  let isValid = true;

  if (activity.value === "") {
    errorMsg.value = "Aktivitetsnamn saknas";
    isValid = false;
  } else if (step_value.value < 1) {
    errorMsg.value = "Stegvärde saknas";
    isValid = false;
  }

  if (!isValid) {
    setTimeout(() => {
      errorMsg.value = "";
    }, 14000); // 7 seconds
  }

  return isValid;
};

// update activity
const updateActivity = async () => {
  // check if input is valid
  try {
    if (!validateInput()) {
      return;
    }

    const formattedActivity =
      activity.value.charAt(0).toUpperCase() + activity.value.slice(1); // Convert the first character to uppercase

    const { data, error } = await supabase
      .from("activities")
      .update({
        activity: formattedActivity,
        step_value: step_value.value,
      })
      .eq("id", id);

    // check for error else push success msg
    if (error) throw error;
    if (!error) {
      successMsg.value = "Aktivitet uppdaterad!";
    }
    setTimeout(() => {
      successMsg.value = "";
      router.push({ path: "/admin/activities" }); // redirect to admin page
    }, 1000);
  } catch (error) {
    errorMsg.value = "Det gick inte att uppdatera aktiviteten just nu.";
  }
};

// delete activity
const deleteActivity = async () => {
  const { data, error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id);

  // check for error else push success msg
  if (error) throw error;
  if (!error) {
    successMsg.value = "Aktivitet borttagen!";
  }
  setTimeout(() => {
    successMsg.value = "";
    router.push({ path: "/admin/activities" }); // redirect to admin page
  }, 1000);
};

const user = useSupabaseUser();
// Redirect to the login page if the user is not signed in
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/login");
  }
});

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>
