<template>
  <div class="right-column">
    <article>
      <h1>Lägg till Destination</h1>
      <form class="form-admin">
        <p v-if="pending">Laddar...</p>
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
          <button @click.prevent="updateDestination" class="btn-bg-clay-black">
            Uppdatera <i class="fas fa-plus"></i>
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
        <!-- error msg div, aria assertive - screenread reads this msg when if it triggers -->
        <div
          v-if="errorMsg"
          class="error-box"
          role="alert"
          aria-live="assertive"
        >
          {{ errorMsg }}
        </div>
      </form>
    </article>
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
    }, 2000);

    
  } catch (error) {
    console.log("error", error);
    errorMsg.value = error.message;
    pending.value = false;
  }
};
</script>
