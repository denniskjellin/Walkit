<template>
  <section class="section-block section-percentage">
    <!-- writing out the % accomplished towards the destination -->
    <SvgPercentblockIco />
    <h2 class="h1-s">{{ percentage }}%</h2>
    <p>av målet är uppnått!</p>
    <!-- progress bar, styling in sectionblock.scss -->
    <progress class="progress" :value="percentage" max="100"></progress>
    <p
      v-if="errorMsg"
      class="error-box center"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMsg }}
    </p>
  </section>
</template>

<script setup>
// Variable for the supabase client, steps_goal, percentage and errorMsg
const supabase = useSupabaseClient();
const steps_goal = ref(null);
const percentage = ref(null);
const errorMsg = ref("");

// getCompletedSteps is a function that gets the number of steps completed and the goal number of steps for the active destination
const getCompletedSteps = async () => {
  try {
    const { data: activeDestinations, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;

    // Get the ID of the first active destination (there should only be one)
    const destinationId = activeDestinations[0]?.id;
    // If there is no active destination, throw an error
    if (!destinationId) {
      if (error) throw error;
    }

    // Get all steps for the active destination
    const { data: stepsData, error: stepsError } = await supabase
      .from("steps")
      .select("steps")
      .eq("destination_id", destinationId);

    if (stepsError) throw stepsError;

    // Total number of steps completed
    const completedSteps = stepsData.reduce(
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

    // Number of steps required to reach the goal
    const remainingSteps = Math.max(
      0,
      destinationData[0]?.steps_goal - completedSteps
    );

    // Percentage of completed steps
    const percentageValue = Math.max(
      0,
      Math.min(100, (completedSteps / destinationData[0]?.steps_goal) * 100)
    );
    // use Math.round to round the percentage to the nearest integer
    percentage.value = Math.round(percentageValue);
    // Set the value of the ref "steps_goal" to the goal number of steps for the active destination
    steps_goal.value = remainingSteps;
  } catch (error) {
    errorMsg.value = "Något gick fel.. :(";
  }
};

onMounted(getCompletedSteps);
</script>
