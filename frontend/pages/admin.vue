<!-- pages/index.vue -->
<template>
  <div class="container">
    <div class="left-column">
      <article>
        <h1>Get data</h1>
        <ul>
          <li v-for="destination in destinations" :key="destination.id">
            Destination ID: {{ destination.from }}
          </li>
        </ul>
      </article>
      <!-- error msg div, aria assertive - screenread reads this msg when if it triggers -->
      <div v-if="errorMsg" class="error-box" role="alert" aria-live="assertive">
        {{ errorMsg }}
      </div>
    </div>
    <div class="right-column">
      <article>
        <h1>hey</h1>
        <form class="form-admin">
          <div class="input-section">
            <label class="label-form" for="from">Från:</label>
            <input
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
              type="date"
              v-model="end"
              class="input-form"
              id="end"
              name="end"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="bool">Aktiv:</label>
            <input
              type="checkbox"
              v-model="bool"
              class="input-form"
              id="bool"
              name="bool"
              required
            />
          </div>
          <div class="add-steps-form__submit input-label-container">
            <!-- call inserSteps when button is pushed, @btn styling inside button components -->
            <button
              @click.prevent="insertDestination"
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
const bool = ref(false);


// function fetch destinations from Supabase
const fetchDestinations = async () => {
  try {
    let { data: response, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true)
      .order("start", { ascending: true });

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
  try {
    const user = useSupabaseUser();
    if (!user.value) {
      throw new Error("User not logged in");
    }


    const { data: destinationData, error: destinationError } = await supabase
      .from("destinations")
      .insert([
        {
          from: from.value,
          to: to.value,
          steps_goal: stepsGoal.value,
          start: start.value,
          end: end.value,
          is_active: bool.value,
          
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

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style lang="scss" scoped>
/* add any custom styles for the form here */
</style>
