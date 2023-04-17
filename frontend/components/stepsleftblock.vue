<template>
  <div class="content-div">
    <section class="section-block steps-left">
      <p class="h1-s bold">{{ remainingSteps }}</p>
      <p class="bold">steg kvar!</p>
      <hr class="pink-line line-small" />
      <p
        v-if="errorMsg"
        class="error-box center"
        role="alert"
        aria-live="assertive"
      >
        {{ errorMsg }}
      </p>
    </section>
  </div>
</template>

<script setup>
// Variable for the supabase client, remainingSteps and errorMsg
const supabase = useSupabaseClient();
const remainingSteps = ref(null);
const errorMsg = ref("");

const getRemainingSteps = async () => {
  try {
    // Get active destination
    const { data: activeDestinations, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;

    // Get the ID of the first active destination (there should only be one)
    const destinationId = activeDestinations[0]?.id;
    if (!destinationId) {
      if (error) throw error;
    }

    // Get all steps for the active destination
    const { data: stepsData, error: stepsError } = await supabase
      .from("steps")
      .select("steps")
      .eq("destination_id", destinationId);

    if (stepsError) throw stepsError;

    // Sumary of all steps added to the active destination
    const totalSteps = stepsData.reduce(
      (total, current) => total + current.steps,
      0
    );

    // Get the goal number of steps for the active destination
    const { data: destinationData, error: destinationError } = await supabase
      .from("destinations")
      .select("steps_goal")
      .eq("id", destinationId);

    // If there is an error, throw it
    if (destinationError) throw destinationError;
    // Get the goal number of steps for the active destination
    const stepsGoal = destinationData[0]?.steps_goal;

    // Count the remaining steps and set the value of the ref "remainingSteps"
    const remainingStepsValue = stepsGoal - totalSteps;
    remainingSteps.value = remainingStepsValue;
  } catch (error) {
    errorMsg.value = "Kan ej läsa in data.. :(";
  }
};
// Run getRemainingSteps when the component is mounted
onMounted(getRemainingSteps);
</script>
