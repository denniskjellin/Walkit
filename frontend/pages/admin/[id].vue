<template>
  <div class="container">
    <div class="left-column">
      <section>
        <h1>Vald destination</h1>
        <div
          class="card"
          :class="destination.is_active ? 'background-active' : ''"
        >
          <div class="card-container">
            <p>Från: {{ destination.from }}</p>
            <p>Till: {{ destination.to }}</p>
            <p>Mål antal steg: {{ destination.steps_goal }}</p>
            <p>Startdatum: {{ destination.start }}</p>
            <p v-if="destination.end !== null">
              Slutdatum: {{ destination.end }}
            </p>
            <p v-else>Slutdatum: ej bestämt</p>
            <p v-if="destination.is_active">Aktiv: Aktiv</p>
            <p v-else>Aktiv: Inaktiv</p>
          </div>
        </div>
      </section>
    </div>
    <div class="right-column">
      <section>
        <h2>Redigera destination</h2>
        <form class="form-admin">
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
            <label class="label-form" for="stepsGoal">Stegmål:</label>
            <input
              aria-label="Stegmål"
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
              class="btn-bg-clay-black"
            >
              Uppdatera <i class="fas fa-plus"></i>
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
const uri = "http://localhost:3000/admin/" + id;

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
const start = ref(destination.start);
const end = ref(destination.end);
const isActive = ref(destination.is_active);
const pending = ref(false);
const router = useRouter();

// success/error msg
const successMsg = ref("");
const errorMsg = ref("");

// function to update destination
const updateDestination = async () => {
  pending.value = true;
  try {
    const { data, error } = await supabase
      .from("destinations")
      .update([
        {
          from: from.value,
          to: to.value,
          steps_goal: stepsGoal.value,
          start: start.value,
          end: end.value,
          is_active: isActive.value,
        },
      ])
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
      router.push({ path: "/admin" }); // redirect to admin page
    }, 1000);
  } catch (error) {
    errorMsg.value = error.message;
    pending.value = false;
  }
};

// function to check if new destination is active (if so, set all other destinations to inactive when updated)
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
    await updateDestination();
  } catch (error) {
    errorMsg.value = "Det gick inte att lägga till destination just nu.";
  }
};
</script>
