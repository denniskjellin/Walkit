<!-- admin page-->
<template>
  <div class="container main">
    <div class="left-column">
      <article>
        <h1>Lista</h1>
        <p v-if="pending">Laddar...</p>
        <section
          v-for="destination in destinations"
          :key="destination.id"
          class="card"
          :class="destination.is_active ? 'background-active' : ''"
        >
          <!-- Cards with destination information  -->
          <div class="card-container">
            <h2>Destination</h2>
            <p>Från: {{ destination.from }}</p>
            <p>Till: {{ destination.to }}</p>
            <p>Mål antal steg: {{ destination.steps_goal }}</p>
            <p>Total distans: {{ destination.km }} km</p>
            <p>Startdatum: {{ destination.start }}</p>
            <p v-if="destination.end !== null">
              Slutdatum: {{ destination.end }}
            </p>
            <p v-else>Slutdatum: ej bestämt</p>
            <p v-if="destination.is_active">Aktiv: Aktiv</p>
            <p v-else>Aktiv: Inaktiv</p>
            <NuxtLink
              class="btn-bg-clay-black"
              :to="`/admin/${destination.id}`"
            >
              Redigera
            </NuxtLink>
            <button
              class="btn-bg-clay-black"
              @click="deleteDestination(destination.id)"
            >
              Ta bort
            </button>
          </div>
        </section>
      </article>
    </div>
    <div class="right-column">
      <section>
        <h1>Lägg till Destination</h1>
        <form class="form-admin" aria-label="Lägg till destination">
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
              aria-label="Start datum"
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
          <!-- error msg div, aria assertive  -->
          <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
            <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
            <p v-if="successMsg" class="success-box steps">{{ successMsg }}</p>
          </div>

          <!-- add destination button -->
          <button
            @click.prevent="checkActiveStatus"
            class="btn-bg-clay-black"
            aria-label="Lägg till destination"
          >
            Lägg till <i class="fas fa-plus"></i>
          </button>
        </form>
      </section>
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
const km = ref(0);
const start = ref(null);
const end = ref(null);
const isActive = ref(false);
const pending = ref(false);

// validation check for form inputs
const validateInput = () => {
  let isValid = true;

  if (from.value.length < 2) {
    errorMsg.value = "Från: Behöver vara minst två tecken.";
    isValid = false;
  } else if (to.value.length < 2) {
    errorMsg.value = "Till: Behöver vara minst två tecken.";
    isValid = false;
  } else if (stepsGoal.value < 1) {
    errorMsg.value = "Stegmål: Kan inte vara mindre än 1.";
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
    }, 7000); // 7 seconds
  }

  return isValid;
};


// function fetch destinations from Supabase
const fetchDestinations = async () => {
  pending.value = true;
  try {
    let { data: response, error } = await supabase
      .from("destinations")
      .select("*")
      .order("start", { ascending: true });

    if (response) {
      // Sort the response so that the active destination is always on top
      response.sort((a, b) => {
        if (a.is_active === b.is_active) {
          // If both records have the same is_active value, sort by start date
          return new Date(a.start) - new Date(b.start);
        } else {
          // If one of the records has is_active set to true, move it to the top
          return a.is_active ? -1 : 1;
        }
      });
      pending.value = false;
      return response;
    }

    if (error) throw error;
  } catch (error) {
    // Set a custom error message
    errorMsg.value = "Det gick inte att hämta destinationer just nu.";
    pending.value = false;
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
          km: km.value,
          start: start.value,
          end: end.value,
          is_active: isActive.value,
        },
      ]);

    if (destinationError) throw destinationError;
    if (!destinationError) {
      successMsg.value = "Destinationen har lagts till!";
      destinations = await fetchDestinations();
    }

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
      date.value = null;
      steps.value = 0;
      km.value = 0;
      from.value = "";
      to.value = "";
      stepsGoal.value = 0;
      start.value = null;
      end.value = null;
    }, 2000);
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att lägga till destination just nu.";
    return [];
  }
};

/**
 * First if new destination is active, set all other
 * destinations to inactive
 */
const checkActiveStatus = async () => {
  try {
    // If validation is successful, continue
    if (validateInput()) {
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
    }
  } catch (error) {
    errorMsg.value = "Det gick inte att lägga till destination just nu.";
  }
};

// Delete a destination
const deleteDestination = async (id) => {
  try {
    if (
      confirm("Är du säker på att du vill radera? Detta går ej att ångra!") ==
      true
    ) {
      const { data: deleteData, error: deleteError } = await supabase
        .from("destinations")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      if (!deleteError) {
        successMsg.value = "Destinationen har tagits bort!";
        destinations = await fetchDestinations();
      }
    }

    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
    }, 1000);
  } catch (error) {
    errorMsg.value = "Det gick inte att ta bort destination just nu.";
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
