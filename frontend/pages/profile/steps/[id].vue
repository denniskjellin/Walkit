<template>
  <ProfileHeroImg />
  <ProfileUserDetails />
  <div class="container-main-activities">
    <form class="form-admin">
      <div class="input-section">
        <label class="label-form" for="step_value">Stegvärde:</label>
        <input
          aria-label="Stegvärde"
          v-model="step_value"
          class="input-form"
          type="number"
          id="step_value"
          name="step_value"
          required
        />
      </div>
      <div class="input-section">
        <label class="label-form" for="date">Datum:</label>
        <input
          aria-label="Datum"
          type="date"
          v-model="date"
          class="input-form"
          id="date"
          name="date"
          required
        />
      </div>
      <button
        @click.prevent="updateSteps"
        class="btn-primary btn-forest"
        aria-label="Lägg till destination"
      >
        Uppdatera <i class="fas fa-sync-alt"></i>
      </button>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const { id } = useRoute().params;
const uri = "http://localhost:3000/profile/steps/" + id;

// fetch steps from Supabase with id
const { data: steps, error } = await supabase
  .from("steps")
  .select("*")
  .eq("id", id)
  .single();

// variables to hold current values
let step_value = ref(steps.steps);
let date = ref(steps.date);

// function to update steps in database
const updateSteps = async () => {
  const { error } = await supabase
    .from("steps")
    .update({ steps: step_value.value, date: date.value })
    .eq("id", id);
  if (error) {
    console.log(error);
  } else {
    console.log("Steps updated successfully!");
  }
};
</script>

<style lang="scss" scoped></style>
