<template>
  <template v-if="hasActiveDestinationBool">
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
        <div class="container-flex">
          <button
            class="tab"
            :class="tab === 'steps' ? 'active' : ''"
            @click.prevent="tab = 'steps'"
          >
            Lägg till steg
          </button>
          <button
            class="tab"
            :class="tab === 'activity' ? 'active' : ''"
            @click.prevent="tab = 'activity'"
          >
            Lägg till aktivitet
          </button>
        </div>

        <!-- Steg -->
        <template v-if="tab === 'steps'">
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

          <!-- success msg div, aria assertive - screenread reads this msg when if it triggers -->
          <div
            v-if="errorMsg || successMsg"
            role="alert"
            aria-live="assertive"
            class="full-width"
          >
            <p v-if="errorMsg" class="error-box steps">
              {{ errorMsg }}
            </p>
            <p v-if="successMsg" class="success-box steps">
              {{ successMsg }}
            </p>
          </div>

          <!-- call inserSteps when button is pushed, @btn styling inside button components -->
          <button
            @click.prevent="insertSteps()"
            class="btn-primary btn-forest btn-margin"
            aria-label="Lägg till steg"
          >
            Lägg till <i class="fas fa-plus"></i>
          </button>
        </template>

        <!-- end Steg -->

        <!-- Aktivitet -->
        <template v-if="tab === 'activity'">
          <div class="input-label-container">
            <label for="activity">Välj aktivitet</label>
            <select
              class="input-add-steps-form"
              name="activity"
              id="activity"
              v-model="activityValue"
              aria-label="Välj aktivitet"
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
            <label class="label-add-steps-form" for="minutes"
              >Antal minuter</label
            >
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
          <div
            v-if="activityInsertStepsError || activityInsertStepsSuccess"
            role="alert"
            aria-live="assertive"
            class="full-width"
          >
            <p v-if="activityInsertStepsError" class="error-box steps">
              {{ activityInsertStepsError }}
            </p>
            <p v-if="activityInsertStepsSuccess" class="success-box steps">
              {{ activityInsertStepsSuccess }}
            </p>
          </div>

          <button
            @click.prevent="insertActivitySteps()"
            class="btn-primary btn-forest btn-margin"
            aria-label="Lägg till steg"
          >
            Lägg till <i class="fas fa-plus"></i>
          </button>
        </template>

        <!-- end Aktivitet -->
      </div>
    </form>
  </template>
  <div v-else class="container">
    <p class="error-box-index">Finns ingen aktiv destination att logga steg emot.</p>
  </div>
</template>

<script setup>
// initiate supabase client
const supabase = useSupabaseClient();

// initiate variables
let updatedStepsValue = "";
const todayDate = new Date().toISOString().slice(0, 10); // set todays date as default

// ref variables
let date = ref(todayDate);
let tab = ref("steps");
let steps = ref(0);
let activityValue = ref(0);
let activityMinutes = ref(0);
let hasActiveDestinationBool = ref(false);
let calculatedActivitySteps = ref(0);

// error
let errorMsg = ref("");
let activityInsertStepsError = ref("");

// success
let successMsg = ref("");
let activityInsertStepsSuccess = ref("");

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

// function to validate steps and date
function validateSteps() {
  if (tab.value === "activity") {
    if (activityMinutes.value < 1) {
      return "Antal minuter måste vara 1 eller högre!";
    }
    if (activityValue.value === 0) {
      return "Välj en aktivitet!";
    }
    if (calculatedActivitySteps.value === 0) {
      return "Antal minuter var för lågt!";
    }
  } else if (tab.value === "steps") {
    // check if steps is a positive number
    if (steps.value < 1) {
      return "Antal steg måste vara 1 eller högre!";
    }
  }

  // check if date is in the future
  if (new Date(date.value) > new Date()) {
    return "Du kan inte lägga till steg för framtida datum!";
  }

  return "";
}

// insert steps function
async function insertSteps() {
  let validatorMessage = validateSteps();

  if (validatorMessage != "") {
    errorMsg.value = validatorMessage;

    setTimeout(() => {
      errorMsg.value = "";
    }, 14000);

    return;
  }

  let successfull = await insertStepsToDatabase(date.value, steps.value);

  if (successfull) {
    successMsg.value = "Stegen har lagts till!";

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date.value = todayDate;
      steps.value = 0;
      calculatedActivitySteps.value = 0;
    }, 1000);

    // Update the remaining steps
    updateStateVariables();
  } else {
    errorMsg.value = "Ops, någonting gick fel!";

    setTimeout(() => {
      errorMsg.value = "";
      successMsg.value = "";
    }, 14000);
  }
}

async function insertActivitySteps() {
  calculatedActivitySteps.value = calculateSteps(
    activityValue.value,
    activityMinutes.value
  );

  let validatorMessage = validateSteps();

  if (validatorMessage != "") {
    activityInsertStepsError.value = validatorMessage;

    setTimeout(() => {
      activityInsertStepsError.value = "";
    }, 14000);

    return;
  }
  console.log(date.value, "date value");
  let successfull = await insertStepsToDatabase(
    date.value,
    calculatedActivitySteps.value
  );

  if (successfull) {
    activityInsertStepsSuccess.value = "Stegen har lagts till!";

    setTimeout(() => {
      activityInsertStepsSuccess.value = "";
      activityInsertStepsError.value = "";
      date.value = todayDate;
      steps.value = 0;
      calculatedActivitySteps.value = 0;
    }, 1000);

    // Update the remaining steps
    updateStateVariables();
  } else {
    activityInsertStepsError.value = "Ops, någonting gick fel!";

    setTimeout(() => {
      activityInsertStepsError.value = "";
      activityInsertStepsSuccess.value = "";
    }, 14000);
  }
}

function calculateSteps(activityValue, activityMinutes) {
  return Math.round((activityValue / 30) * activityMinutes);
}

async function hasActiveDestination() {
  const { data: activeDestinations, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true);

  if (activeDestinations.length <= 0) {
    hasActiveDestinationBool.value = false;
  } else if (activeDestinations.length > 0) {
    hasActiveDestinationBool.value = true;
  }
}
hasActiveDestination();

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
      }, 14000);
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

const props = defineProps(["visible"]);

watch(
  () => props.visible,
  (newValue, oldValue) => {
    hasActiveDestination();
  }
);

onMounted(async () => {
  activityListData.value = await getAllActivities();
});
</script>
