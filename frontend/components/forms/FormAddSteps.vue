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
          min="0"
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
        @click.prevent="insertSteps()"
        class="btn-primary btn-forest"
        aria-label="Lägg till steg"
      >
        Lägg till <i class="fas fa-plus"></i>
      </button>
    </div>
  </form>
  <div>
    <form class="add-steps-form">
      <div class="input-label-container">
        <label for="activity">Välj aktivitet</label>
        <select
          class="input-add-steps-form"
          name="activity"
          id="activity"
          v-model="activityValue"
        >
          <option
            v-for="(item, index) in activityListData?.activities"
            :key="index"
            :value="item.step_value"
          >
            {{ item.activity }}
          </option>
        </select>
      </div>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="minutes">Antal minuter</label>
        <input
          required
          class="input-add-steps-form"
          min="0"
          id="minutes"
          type="number"
          v-model="activityMinutes"
          aria-label="Antal minuter"
        />
      </div>
      

      <button
        @click.prevent="insertActivitySteps()"
        class="btn-primary btn-forest"
        aria-label="Lägg till steg"
      >
        Lägg till
      </button>
    </form>
  </div>
</template>

<script setup>
// initiate supabase client
const supabase = useSupabaseClient();

// initiate variables
let updatedStepsValue = "";
const todayDate = new Date().toISOString().slice(0, 10); // set todays date as default

// ref variables
const date = ref(todayDate);
const steps = ref(0);
const errorMsg = ref("");
const successMsg = ref("");
let activityValue = ref(0);
let activityMinutes = ref(0);

// state variables
let remainingStepsData = useState("remainingStepsState");
let totalStepsData = useState("totalStepsData");
let totalWalkedData = useState("totalWalkedData");
let userDailyStepsData = useState("userDailyStepsState");
let getAllStepsData = useState("getAllStepsState");
let getAllStepsWeekData = useState("getAllStepsWeekState");
let getAllUsersData = useState("getAllUsersState");
let getToplistStepsData = useState("getToplistStepsState");
let getUserMonthlyStepsData = useState("userMonthlyStepsState");
let getAllTimeStepsUserData = useState("userAllTimeStepsState");
let getUserWeeklyStatsData = useState("getUserWeeklyStatsState");
let userStepsEntryData = useState("userStepsEntryState");
let activityListData = useState("activityListState");

// paginatian variables
let lastPage = useState("lastPageState", () => 1);
let page = useState("pageState", () => 1);

// insert steps function
async function insertSteps() {
  let successfull = await insertStepsToDatabase(date.value, steps.value);

  if (successfull) {
    successMsg.value = "Stegen har lagts till!";

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date = null;
      steps = 0;
    }, 1000);

    // Update the remaining steps
    updateStateVariables();
  } else {
    errorMsg.value = "Ops, någonting gick fel!";

    setTimeout(() => {
      errorMsg.value = "";
      successMsg.value = "";
    }, 7000);
  }
}

async function insertActivitySteps() {
  let calculatedActivitySteps = calculateSteps(
    activityValue.value,
    activityMinutes.value
  );
  let successfull = await insertStepsToDatabase(
    date.value,
    calculatedActivitySteps
  );

  if (successfull) {
    successMsg.value = "Stegen har lagts till!";

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date = null;
      steps = 0;
    }, 1000);

    // Update the remaining steps
    updateStateVariables();
  } else {
    errorMsg.value = "Ops, någonting gick fel!";

    setTimeout(() => {
      errorMsg.value = "";
      successMsg.value = "";
    }, 7000);
  }
}

function calculateSteps(activityValue, activityMinutes) {
  return Math.round((activityValue / 30) * activityMinutes);
}

// function to insert steps
async function insertStepsToDatabase(date, steps) {
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
      }, 7000);
    }

    // Check if the steps value is valid
    if (steps < 1) {
      errorMsg.value = "Antal steg måste vara 1 eller högre!";
      setTimeout(() => {
        errorMsg.value = "";
      }, 7000);
      return;
    }

    // Date check, if the selected date is in the future, throw an error
    const currentDate = new Date();
    const selectedDate = new Date(date);
    if (selectedDate > currentDate) {
      errorMsg.value = "Du kan inte lägga till steg för framtida datum!";
      setTimeout(() => {
        errorMsg.value = "";
      }, 7000);
      return;
    }

    // Insert the steps
    const { data: stepsData, error: stepsError } = await supabase
      .from("steps")
      .insert([
        {
          date: date,
          steps: steps,
          user_id,
          destination_id: destinationId,
        },
      ]);

    // Reset the form if success
    if (stepsError) throw stepsError;

    return true;
  } catch (error) {
    // set a custom error message

    return false;
  }
}

// insert steps by activity to Supabase

async function updateStateVariables() {
  remainingStepsData.value = await getRemainingStepsData();
  totalStepsData.value = await getTotalSteps();
  totalWalkedData.value = await getTotalWalked();
  userDailyStepsData.value = await getUserSteps();
  getAllStepsData.value = await getAllSteps();
  getAllStepsWeekData.value = await getAllStepsWeek();
  getAllUsersData.value = await getAllUsers();
  getToplistStepsData.value = await getToplistSteps();
  getUserMonthlyStepsData.value = await getUserMonthlySteps();
  getAllTimeStepsUserData.value = await getAllTimeStepsUser();
  getUserWeeklyStatsData.value = await getUserWeeklyStats();
  userStepsEntryData.value = await getAllUserStepsEntry(page.value);

  const lengthData = await getNumberUserStepsEntry();
  lastPage.value = lengthData.userNumberStepsEntrys;
}

onMounted(async () => {
  activityListData.value = await getAllActivities();
});
</script>
