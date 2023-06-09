<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <div class="container-main-activities">
    <h2 class="h2-s">Redigera steg</h2>
    <form class="form">
      <div class="input-section">
        <label class="label-form" for="step_value">Stegvärde:</label>
        <input
          aria-label="Stegvärde"
          v-model="step_value"
          class="input-form"
          type="number"
          id="step_value"
          name="step_value"
          required
        />
      </div>
      <div class="input-section">
        <label class="label-form" for="dateInput">Datum:</label>
        <input
          aria-label="Datum"
          type="date"
          v-model="dateInput"
          class="input-form"
          id="dateInput"
          name="dateInput"
          required
        />
      </div>
      <!-- error msg div, aria assertive  -->
      <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
        <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success-box steps">{{ successMsg }}</p>
      </div>
      <button
        @click.prevent="updateSteps"
        class="btn-primary btn-forest"
        aria-label="Lägg till destination"
      >
        Uppdatera <i class="fas fa-sync-alt"></i>
      </button>
      <button
        @click.prevent="deleteSteps"
        class="btn-primary btn-danger btn-margin-top"
        aria-label="Lägg till destination"
      >
        Ta bort <i class="fas fa-trash-alt"></i>
      </button>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const { id } = useRoute().params;
const uri = "http://localhost:3000/profile/steps/" + id;
const router = useRouter();

// fetch steps from Supabase with id
const { data: steps, error } = await supabase
  .from("steps")
  .select("*")
  .eq("id", id)
  .single();

// variables to hold current values
let step_value = ref(steps.steps);
let dateInput = ref(steps.date);

// success/error msg
let errorMsg = ref("");
let successMsg = ref("");

const updateSteps = async () => {
  // Date check, if the selected date is in the future, throw an error
  const currentDate = new Date();
  const selectedDate = new Date(date.value);
  if (selectedDate > currentDate) {
    errorMsg.value = "Du kan inte lägga till steg för framtida datum!";
    setTimeout(() => {
      errorMsg.value = "";
    }, 14000);
    return;
  }

  if (!validateInput()) {
    return;
  }

  try {
    const { error } = await supabase
      .from("steps")
      .update({
        steps: step_value.value,
        date: dateInput.value,
      })
      .eq("id", id);

    // check for error else push success msg
    if (error) throw error;
    if (!error) {
      successMsg.value = "Steg uppdaterade!";
    }
    setTimeout(() => {
      successMsg.value = "";
      router.push({ path: "/profile/steps/" }); // redirect to admin page
    }, 1000);
  } catch (error) {
    errorMsg.value = "Det gick inte att uppdatera aktiviteten just nu.";
  }
};

const validateInput = () => {
  let isValid = true;
  // check if input is empty
  if (step_value.value < "") {
    errorMsg.value = "Du måste ange minst ett steg!";
    isValid = false;
  } else if (date.value === "") {
    errorMsg.value = "Du måste ange ett datum!";
    isValid = false;
  }

  if (!isValid) {
    setTimeout(() => {
      errorMsg.value = "";
    }, 14000); 
  }

  return isValid;
};

// delete steps
const deleteSteps = async () => {
  try {
    const { error } = await supabase.from("steps").delete().eq("id", id);
    if (error) throw error;
    if (!error) {
      successMsg.value = "Steg borttagna!";
    }
    setTimeout(() => {
      successMsg.value = "";
      router.push({ path: "/profile/steps/" }); // redirect to admin page
    }, 1000);
  } catch (error) {
    errorMsg.value = "Det gick inte att ta bort stegen just nu.";
  }
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

<style lang="scss" scoped></style>
