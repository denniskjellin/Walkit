<!-- admin page-->
<template>
  <div class="container-main-activities">
    <h1 class="h2-s">Lägg till aktivitet</h1>
    <div class="top-column">
      <form class="form-admin" aria-label="Lägg till aktivitet">
        <div class="input-section">
          <label class="label-form" for="activity">Aktivitetsnamn:</label>
          <input
            aria-label="Aktivitetsnamn"
            v-model="activity"
            class="input-form"
            type="text"
            id="activity"
            name="activity"
            required
          />
        </div>

        <div class="input-section">
          <label class="label-form" for="step_value"
            >Stegvärde per 30 minut:</label
          >
          <input
            aria-label="Stegvärde per 30 minut"
            v-model="step_value"
            class="input-form"
            type="number"
            min="0"
            id="step_value"
            name="step_value"
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
          @click.prevent="insertActivity"
          class="btn-primary btn-forest"
          aria-label="Lägg till destination"
        >
          Lägg till <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>

    <div class="bottom-row">
      <!-- <p v-if="pending">Laddar...</p> -->
      <section v-for="activities in activities" :key="activity.id" class="card">
        <h2 class="visually-hidden">Aktivitetskort för {{ activities.activity }}</h2>
        <div class="card-container">
          <p><span class="bold">Aktivitet:</span> {{ activities.activity }}</p>
          <p>
            <span class="bold">Stegvärde - 30 min:</span>
            {{ activities.step_value }}
          </p>

          <NuxtLink
            class="btn-primary btn-forest"
            :to="`/admin/aktivitetshantering/${activities.id}`"
          >
            Redigera <i class="fas fa-edit"></i>
          </NuxtLink>
          <button
            class="btn-primary btn-danger"
            @click="deleteActivity(activities.id)"
          >
            Ta bort <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// variables
const supabase = useSupabaseClient();
const errorMsg = ref("");
const successMsg = ref("");
// form inputs
const activity = ref("");
const step_value = ref(0);

// validation check for form inputs
const validateInput = () => {
  let isValid = true;

  if (activity.value === "") {
    errorMsg.value = "Aktivitetsnamn saknas";
    isValid = false;
  } else if (step_value.value === 0) {
    errorMsg.value = "Stegvärde saknas";
    isValid = false;
  }

  if (!isValid) {
    setTimeout(() => {
      errorMsg.value = "";
    }, 7000); // 7 seconds
  }

  return isValid;
};

// insert activity to supabase activities table
const insertActivity = async () => {
  try {
    const user = useSupabaseUser();

    // Get the user ID
    const { id: user_id } = user.value;
    if (!user.value) {
      throw new Error("User not logged in");
    }

    if (validateInput()) {
      // insert activity to supabase
      const { data: activityData, error: insertError } = await supabase
        .from("activities")
        .insert([
          {
            activity: activity.value,
            step_value: step_value.value,
            added_by: user_id,
          },
        ]);

      if (insertError) throw insertError;
      if (!insertError) {
        successMsg.value = "Aktivitet tillagd!";
        activities = await fetchActivities();
      }

      setTimeout(() => {
        successMsg.value = "";
        activity.value = "";
        step_value.value = 0;
        // router.push("/admin/aktivitetshantering");
      }, 2000);
    }
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att lägga till aktivitet just nu.";
    return [];
  }
};

const fetchActivities = async () => {
  try {
    let { data: activities, error } = await supabase
      .from("activities")
      .select("*")
      .order("activity", { ascending: true });

    if (error) throw error;
    if (!error) {
      return activities;
    }
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att hämta aktiviteter just nu.";
    return [];
  }
};

// delete activity
const deleteActivity = async (id) => {
  try {
    if (
      confirm("Är du säker på att du vill radera? Detta går ej att ångra!") ==
      true
    ) {
      const { error } = await supabase.from("activities").delete().eq("id", id);

      if (error) throw error;
      if (!error) {
        successMsg.value = "Aktivitet borttagen!";
        activities = await fetchActivities();
      }

      setTimeout(() => {
        successMsg.value = "";
      }, 2000);
    }
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att ta bort aktivitet just nu.";
    return [];
  }
};

let activities = [];
activities = await fetchActivities();
console.log(activities);
</script>

<style lang="scss" scoped>
/* add any custom styles for the form here */
</style>
