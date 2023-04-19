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
      .select("id")
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

  return returnValue;
};

export const getTotalSteps = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
    // steps_goal: 0,
    totalSteps: 0,
    errorMsg: "",
  };

  try {
    //  Get the goal number of steps for the active destination
    const { data: destinationData, error: destinationError } = await supabase
      .from("destinations")
      .select("steps_goal")
      .eq("is_active", true);
    // If there is an error, throw it
    if (destinationError) throw destinationError;

    if (!destinationData[0]?.steps_goal) throw destinationError;
    returnValue.totalSteps = destinationData[0]?.steps_goal;

  } catch (error) {
    returnValue.errorMsg = "Något gick fel.. :(";
  }

  return returnValue;
};

export const getTotalWalked = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
    totalWalked: 0,
    errorMsg: "",
  };

  try {
    // Get active destination
    const { data: activeDestinations, error } = await supabase
      .from("destinations")
      .select("id")
      .eq("is_active", true)
      

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

    returnValue.totalWalked = totalSteps;
    console.log(totalSteps, "totala steg boi")
  } catch (error) {
    returnValue.errorMsg = "Kunde inte hämta antal steg";
  }

  return returnValue;
}



