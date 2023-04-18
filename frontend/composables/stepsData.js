export const getRemainingSteps = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
    remainingSteps: 0,
    errorMsg: "",
  };

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
    returnValue.remainingSteps = remainingStepsValue;
  } catch (error) {
    returnValue.errorMsg = "Kunde inte hämta antal steg";
  }
//   console.log(returnValue, "global.js");
//  console.log(returnValue.remainingSteps, "second")
  return returnValue;
};




