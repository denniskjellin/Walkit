<!-- admin page-->
<template>
  <div class="container-main-activities">
    <h1 class="h2-s">Lägg till aktivitet</h1>
    <div class="top-column">
      <form class="form" aria-label="Lägg till aktivitet">
        <div class="input-section">
          <label class="label-form" for="activity">Aktivitetsnamn:</label>
          <input
            placeholder="T.ex. promenad"
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

        <div v-if="errorMsg || successMsg" role="alert" aria-live="assertive">
          <p v-if="errorMsg" class="error-box">{{ errorMsg }}</p>
          <p v-if="successMsg" class="success-box steps">{{ successMsg }}</p>
        </div>

        <button
          @click.prevent="insertActivity"
          class="btn-primary btn-forest"
          aria-label="Lägg till destination"
        >
          Lägg till <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>
  </div>
  <section class="section-block section-big-bg-clay">
    <section class="datalist-wrapper profile-weekly-stats">
      <h2 class="h2-s">Aktiviteter</h2>
      <div class="input-section search-activity-section">
        <lable for="search">Filtrera</lable>
        <input id="search" v-model="s" type="text" class="input-form" />
      </div>
      <div class="datalist-header header-activity activity-item">
        <span>Aktivitet</span>
        <span>Antal steg</span>
        <span>Redigera</span>
      </div>
  
      <ul class="datalist-list">
        <li
          class="datalist-item activity-item"
          v-for="activity in filteredActivities"
          :key="activity.id"
        >
          <span>{{ activity.activity }}</span>
          <span>{{ numberToSweString(activity.step_value) }}</span>
          <span>
            <NuxtLink :to="`/admin/activities/${activity.id}`">
              Redigera <i class="fas fa-edit"></i>
            </NuxtLink>
          </span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
// variables
const supabase = useSupabaseClient();
const errorMsg = ref("");
const successMsg = ref("");
// form inputs
const activity = ref("");
const step_value = ref(0);

const s = ref("");

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
    }, 14000);
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
      }, 1000);
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
      }, 1000);
    }
  } catch (error) {
    // set a custom error message
    errorMsg.value = "Det gick inte att ta bort aktivitet just nu.";
    return [];
  }
};

let activities = ref([]);
activities.value = await fetchActivities();

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

let filteredActivities = computed(() => {
  let filteredList = activities.value.filter((activity) => {
    return activity.activity.toLowerCase().includes(s.value.toLowerCase());
  });

  return filteredList;
});
</script>

<style lang="scss" scoped>
/* add any custom styles for the form here */
</style>
