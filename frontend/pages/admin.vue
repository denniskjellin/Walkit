<!-- pages/index.vue -->
<template>
  <div class="container">
    <div class="left-column">
      <article>
        <h1>Lista</h1>
        <div
          v-for="destination in destinations"
          :key="destination.id"
          class="card"
        >
          <div class="card-container">
            <h2>Destination</h2>
            <p>Från: {{ destination.from }}</p>
            <p>Till: {{ destination.to }}</p>
            <p>Mål antal steg: {{ destination.steps_goal }}</p>
            <p>Startdatum: {{ destination.start }}</p>
            <p v-if="destination.end !== null">
              Slutdatum: {{ destination.end }}
            </p>
            <p v-else>Slutdatum: ej bestämt</p>
            <p>Aktiv: {{ destination.is_active }}</p>
          </div>
        </div>
      </article>
      <!-- error msg div, aria assertive - screenread reads this msg when if it triggers -->
      <div v-if="errorMsg" class="error-box" role="alert" aria-live="assertive">
        {{ errorMsg }}
      </div>
    </div>
    <div class="right-column">
      <article>
        <h1>Lägg till Destination</h1>
        <form class="form-admin">
          <div class="input-section">
            <label class="label-form" for="from">Från:</label>
            <input
              aria-label="from"
              v-model="from"
              class="input-form"
              type="text"
              id="from"
              name="from"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="to">Till:</label>
            <input
              aria-label="to"
              v-model="to"
              class="input-form"
              type="text"
              id="to"
              name="to"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="stepsGoal">Stegmål:</label>
            <input
              aria-label="Stepsgoal"
              type="number"
              v-model="stepsGoal"
              class="input-form"
              id="stepsGoal"
              name="stepsGoal"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="start">Startdatum:</label>
            <input
              aria-label="start date"
              type="date"
              v-model="start"
              class="input-form"
              id="start"
              name="start"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="end">Slutdatum:</label>
            <input
              aria-label="end date"
              type="date"
              v-model="end"
              class="input-form"
              id="end"
              name="end"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form-checkbox" for="isActive">Aktiv:</label>
            <input
              type="checkbox"
              v-model="isActive"
              id="isActive"
              name="isActive"
              required
            />
          </div>
          <div class="add-steps-form__submit input-label-container">
            <!-- call inserSteps when button is pushed, @btn styling inside button components -->
            <button
              @click.prevent="checkActiveStatus"
              class="btn-bg-clay-black"
            >
              Lägg till <i class="fas fa-plus"></i>
            </button>
          </div>
          <!-- success msg div, aria assertive - screenread reads this msg when if it triggers -->
          <div
            v-if="successMsg"
            class="success-box steps"
            role="alert"
            aria-live="assertive"
          >
            {{ successMsg }}
          </div>
        </form>
      </article>
    </div>
  </div>
</template>

<script setup>
// variables
const supabase = useSupabaseClient();
const errorMsg = ref("");
const successMsg = ref("");
// form variables
const from = ref("");
const to = ref("");
const stepsGoal = ref(0);
const start = ref(null);
const end = ref(null);
const isActive = ref(false);

// function fetch destinations from Supabase
const fetchDestinations = async () => {
  try {
    let { data: response, error } = await supabase
      .from("destinations")
      .select("*")
      .order("created", { ascending: true });

    if (response) {
      return response;
    }
    if (error) throw error;
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att hämta destinationer just nu.";
    return [];
  }
};

let destinations = [];
destinations = await fetchDestinations();

// function for inserting a new destination
const insertDestination = async (destination) => {
  console.log("Inserdestination");
  try {
    const user = useSupabaseUser();
    if (!user.value) {
      throw new Error("User not logged in");
    }
    const supabase3 = useSupabaseClient();
    const { data: destinationData, error: destinationError } = await supabase3
      .from("destinations")
      .insert([
        {
          from: from.value,
          to: to.value,
          steps_goal: stepsGoal.value,
          start: start.value,
          end: end.value,
          is_active: isActive.value,
        },
      ]);

    if (destinationError) throw destinationError;
    successMsg.value = "Destinationen har lagts till!";
    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date.value = null;
      steps.value = 0;
    }, 2000);
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att lägga till destination just nu.";
    console.log(error);
    return [];
  }
};

/**
 * First if new destination is active, set all other
 * destinations to inactive
 */
const checkActiveStatus = async () => {
  try {
    // If the new destination is active, set all other destinations to inactive
    if (isActive.value) {
      const { data: updateData, error: updateError } = await supabase
        .from("destinations")
        .update({ is_active: false })
        .eq("is_active", true); // Update all destinations where is_active is true

      // If there was an error, throw it
      if (updateError) {
        errorMsg.value = "Fel vid uppdatering av befintliga destinationer";
        throw updateError;
      }
    }

    // Add the new destination
    await insertDestination();
  } catch (error) {
    errorMsg.value = "Det gick inte att lägga till destination just nu.";
  }
};

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style lang="scss" scoped>
/* add any custom styles for the form here */
</style>
