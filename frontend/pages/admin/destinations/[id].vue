<template>
  <div class="container">
    <div class="left-column">
      <section>
        <h1 class="h2-s">Vald destination</h1>
        <div
          class="card"
          :class="destination.is_active ? 'background-active' : ''"
        >
          <div class="card-container">
            <p><span class="bold">Från:</span> {{ destination.from }}</p>
            <p><span class="bold">Till:</span> {{ destination.to }}</p>
            <p>
              <span class="bold">Start kordination:</span><br />
              {{ destination.start_cordinations }}
            </p>
            <p>
              <span class="bold">Slut kordination:</span><br />
              {{ destination.end_cordinations }}
            </p>
  
            <p>
              <span class="bold">Antal steg:</span> {{ destination.steps_goal }}
            </p>
            <p>
              <span class="bold">Total distans:</span> {{ destination.km }} km
            </p>
            <p><span class="bold">Startdatum:</span> {{ destination.start }}</p>
            <p v-if="destination.end !== null">
              <span class="bold">Slutdatum:</span> {{ destination.end }}
            </p>
            <p v-else><span class="bold">Slutdatum:</span> ej bestämt</p>
            <div class="textual" v-if="destination.is_active">
              <span class="bold">Status:</span>
              <span class="success-box">Aktiv</span>
            </div>
            <div class="textual" v-else>
              <span class="bold">Status:</span>
              <span class="error-box">Inaktiv</span>
            </div>
          </div>
        </div>
      </section>
      <div class="back-container">
          <NuxtLink class="back-btn" to="/admin/destinations"
            ><i class="fas fa-arrow-left"></i> Tillbaka</NuxtLink
          >
        </div>
    </div>
    <div class="right-column">
      <section>
        <h2 class="h2-s">Redigera destination</h2>
        <form class="form">
          <p v-if="pending">Laddar...</p>
          <div class="input-section">
            <label class="label-form" for="from">Från:</label>
            <input
              aria-label="Från"
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
              aria-label="Till"
              v-model="to"
              class="input-form"
              type="text"
              id="to"
              name="to"
              required
            />
          </div>

          <div class="input-section">
            <label class="label-form" for="start-cordinations"
              >Start kordination:</label
            >
            <input
              placeholder="[36.190522, 27.940551]"
              aria-label="Start kordination"
              v-model="start_cordinations"
              class="input-form"
              type="text"
              id="start-cordinations"
              name="start-cordinations"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="end-cordinations"
              >Slut kordination:</label
            >
            <input
              placeholder="[62.357112, 17.31843]"
              aria-label="Slut kordination"
              v-model="end_cordinations"
              class="input-form"
              type="text"
              id="end-cordinations"
              name="end-cordinations"
              required
            />
          </div>


          <div class="input-section">
            <label class="label-form" for="km">Total distans/km:</label>
            <input
              aria-label="Distans i Km"
              type="number"
              v-model="km"
              class="input-form"
              id="km"
              name="km"
              required
            />
          </div>
          <div class="input-section">
            <label class="label-form" for="start">Startdatum:</label>
            <input
              aria-label="Startdatum"
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
              aria-label="Slutdatum"
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
              aria-label="Aktiv"
              type="checkbox"
              v-model="isActive"
              id="isActive"
              name="isActive"
              required
            />
          </div>
          <!-- success msg div, aria assertive - screenread reads this msg when if it triggers -->
          <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
            <p v-if="errorMsg" class="error-box">
              {{ errorMsg }}
            </p>
            <p v-if="successMsg" class="success-box">
              {{ successMsg }}
            </p>
          </div>

          <div class="add-steps-form__submit input-label-container">
            <!-- call checkActiveStatus when button is pushed, @btn styling inside button components -->
            <button
              @click.prevent="checkActiveStatus"
              class="btn-primary btn-forest"
            >
              Uppdatera <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </form>
      </section>
      
    </div>
    
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const { id } = useRoute().params;
const uri = "http://localhost:3000/admin/destinations/" + id;

// fetch destinations from Supabase
const { data: destination, error } = await supabase
  .from("destinations")
  .select("*")
  .eq("id", id)
  .single();

// read in current values from variables
const from = ref(destination.from);
const to = ref(destination.to);
const stepsGoal = ref(destination.steps_goal);
const km = ref(destination.km);
const start = ref(destination.start);
const end = ref(destination.end);
const start_cordinations = ref(destination.start_cordinations);
const end_cordinations = ref(destination.end_cordinations);
const isActive = ref(destination.is_active);
const pending = ref(false);
const router = useRouter();

// success/error msg
const successMsg = ref("");
const errorMsg = ref("");

// validation check for form inputs
const validateInput = () => {
  let isValid = true;
  const coordinateRegex = /^\[[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?\]$/;

  if (from.value.length < 2) {
    errorMsg.value = "Från: Behöver vara minst två tecken.";
    isValid = false;
  } else if (to.value.length < 2) {
    errorMsg.value = "Till: Behöver vara minst två tecken.";
    isValid = false;
  } else if (!coordinateRegex.test(start_cordinations.value)) {
    errorMsg.value =
      "Start kordination: Felaktig format. Använd formatet [latitud,longitud].";
    isValid = false;
  } else if (!coordinateRegex.test(end_cordinations.value)) {
    errorMsg.value =
      "Slut kordination: Felaktig format. Använd formatet [latitud,longitud].";
    isValid = false;
  } else if (km.value < 1) {
    errorMsg.value = "Total distans: Kan inte vara mindre än 1 km.";
    isValid = false;
  } else if (!start.value) {
    errorMsg.value = "Startdatum kan inte vara tom.";
    isValid = false;
  }

  if (!isValid) {
    setTimeout(() => {
      errorMsg.value = "";
    }, 14000); 
  }

  return isValid;
};

// function to convert km to steps
function kmToSteps(km) {
  return km * 1400;
}

// function to update destination
const updateDestination = async () => {
  pending.value = true;
  // convert km to steps
  const stepsGoal = kmToSteps(km.value);
  try {
    const user = useSupabaseUser();
    if (!user.value) {
      throw new Error("User not logged in");
    }
    if (!validateInput()) return;
    const { data, error } = await supabase
      .from("destinations")
      .update({
        from: from.value,
        to: to.value,
        start_cordinations: start_cordinations.value,
        end_cordinations: end_cordinations.value,
        steps_goal: stepsGoal,
        km: km.value,
        start: start.value,
        end: end.value,
        is_active: isActive.value,
      })
      .eq("id", id);
    pending.value = false;

    // check for error else push success msg
    if (error) throw error;
    if (!error) {
      successMsg.value = "Destination uppdaterad";
    }

    // clear success msg after 2 sec
    setTimeout(() => {
      successMsg.value = "";
      router.push({ path: "/admin/destinations" }); // redirect to admin page
    }, 1000);
  } catch (error) {
    errorMsg.value = "Det gick inte att uppdatera destination just nu.";
    pending.value = false;
  }
};

// function to check if new destination is active (if so, set all other destinations to inactive when updated)
const checkActiveStatus = async () => {
  try {
    // If validation is successful, continue
    if (!validateInput()) return;
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

    // Update the destination
    await updateDestination();
  } catch (error) {
    errorMsg.value = "Det gick inte att uppdatera destination just nu.";
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
