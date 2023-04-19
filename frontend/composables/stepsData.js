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
  } catch (error) {
    returnValue.errorMsg = "Kunde inte hämta antal steg";
  }

  return returnValue;
}

export const destinationSum = async () => {
  const supabase = useSupabaseClient();

  let returnValue = {
    to: "",
    from: "",
    steps_goal: 0,
    is_active: false,
    km: 0,
  };

  try {
    const { data: destinationSum, error  } = await supabase
      .from("destinations")
      .select("to, from, steps_goal, is_active, km")
      .eq("is_active", true);

    if (error) throw error;

    // set return values
    returnValue.to = destinationSum[0]?.to;
    returnValue.from = destinationSum[0]?.from;
    returnValue.steps_goal = destinationSum[0]?.steps_goal;
    returnValue.is_active = destinationSum[0]?.is_active;
    returnValue.km = destinationSum[0]?.km;
  

  } catch (error) {
    console.log(error);
  }
  console.log(returnValue, "hej")
  return returnValue;
    
}



