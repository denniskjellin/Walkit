<template>
  <form class="add-steps-form">
    <div class="input-group">
      <h2 class="h2-s">Registrera steg</h2>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="date">Datum</label>
        <input
          required
          class="input-add-steps-form"
          id="date"
          ref="test"
          type="date"
          v-model="date"
          aria-label="Datum"
        />
      </div>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="steps">Antal steg</label>
        <input
          required
          class="input-add-steps-form"
          id="steps"
          type="number"
          v-model="steps"
          aria-label="Antal steg"
        />
      </div>
    </div>
    <!-- success msg div, aria assertive - screenread reads this msg when if it triggers -->
    <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
      <p v-if="errorMsg" class="error-box steps">
        {{ errorMsg }}
      </p>
      <p v-if="successMsg" class="success-box steps">
        {{ successMsg }}
      </p>
    </div>

    <div class="add-steps-form__submit input-label-container">
      <!-- call inserSteps when button is pushed, @btn styling inside button components -->
      <button
        @click.prevent="insertSteps"
        class="btn-primary btn-forest"
        aria-label="Lägg till steg"
      >
        Lägg till <i class="fas fa-plus"></i>
      </button>
    </div>
  </form>
</template>

<script setup>
// initiate supabase client
const supabase = useSupabaseClient();

// initiate variables
const date = ref(null);
const steps = ref(0);
const errorMsg = ref("");
const successMsg = ref("");
let remainingStepsData = useState("remainingStepsState");
let totalStepsData = useState("totalStepsData");
let totalWalkedData = useState("totalWalkedData");
let topListData = useState("topListState")

// function to insert steps
const insertSteps = async () => {
  try {
    const user = useSupabaseUser();
    if (!user.value) {
      throw new Error("User not logged in");
    }

    // Get the user ID
    const { id: user_id } = user.value;

    // Retrieve the list of active destinations
    const { data: activeDestinations, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;

    /* Get the ID of the first active destination 
     (there should only be one active destination)
     If there are no active destinations, throw an error
     and display a message to the user
    */
    const destinationId = activeDestinations[0]?.id;
    if (!destinationId) {
      errorMsg.value = "Det finns inga aktiva destinationer!";
      setTimeout(() => {
        errorMsg.value = "";
      }, 8000);
    }

    // Check if the steps value is valid
    if (steps.value < 1) {
      errorMsg.value = "Antal steg måste vara 1 eller högre!";
      setTimeout(() => {
        errorMsg.value = "";
      }, 8000);
      return;
    }

    // Date check, if the selected date is in the future, throw an error
    const currentDate = new Date();
    const selectedDate = new Date(date.value);
    if (selectedDate > currentDate) {
      errorMsg.value = "Du kan inte lägga till steg för framtida datum!";
      setTimeout(() => {
        errorMsg.value = "";
      }, 8000);
      return;
    }

    // Insert the steps
    const { data: stepsData, error: stepsError } = await supabase
      .from("steps")
      .insert([
        {
          date: date.value,
          steps: steps.value,
          user_id,
          destination_id: destinationId,
        },
      ]);

    // Reset the form if success
    if (stepsError) throw stepsError;
    successMsg.value = "Stegen har lagts till!";

    // Update 
    remainingStepsData.value  = await getRemainingStepsData();
    totalStepsData.value  = await getTotalSteps();
    totalWalkedData.value  = await getTotalWalked();
    topListData.value = await getUserSteps();

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date.value = null;
      steps.value = 0;
    }, 2000);
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Ops, någonting gick fel!";
    setTimeout(() => {
      errorMsg.value = "";
      successMsg.value = "";
    }, 8000);
  }
};
</script>
