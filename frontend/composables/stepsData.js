// size = number of steps per page
let size = 10;

// get remaining steps to reach destination
export const getRemainingStepsData = async () => {
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
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// total amount of steps to reach destination
export const getTotalSteps = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
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
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// total amount of walked steps towards the active destination
export const getTotalWalked = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
    totalWalked: [],
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
      .select("steps, date")
      .eq("destination_id", destinationId);

    if (stepsError) throw stepsError;

    returnValue.totalWalked = stepsData;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// summary of destination
export const destinationSum = async () => {
  const supabase = useSupabaseClient();

  let returnValue = {
    to: "",
    from: "",
    steps_goal: 0,
    is_active: false,
    km: 0,
    errorMsg: "",
  };

  try {
    const { data: destinationSum, error } = await supabase
      .from("destinations")
      .select("to, from, steps_goal, is_active, km")
      .eq("is_active", true);

    if (error) throw error;

    // set return values
    returnValue.to = destinationSum[0].to;
    returnValue.from = destinationSum[0].from;
    returnValue.steps_goal = destinationSum[0].steps_goal;
    returnValue.is_active = destinationSum[0].is_active;
    returnValue.km = destinationSum[0].km;
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }
  return returnValue;
};

export const getAllUserStepsEntry = async (page = 1) => {
  let from = page * size - size;
  let to = page * size - 1;

  let returnValue = {
    userStepsEntrys: [],
    errorMsg: "",
  };

  try {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const { id: user_id } = user.value;

    if (!user.value) {
      throw new Error("User not logged in");
    }

    const { data: userStepsEntrys, error } = await supabase
      .from("steps")
      .select("steps, id, date, created_at")
      .range(from, to)
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    let allEntrysArray = [];
    allEntrysArray = userStepsEntrys.map((step) => ({
      ...step,
      user_id,
    }));

    returnValue.userStepsEntrys = allEntrysArray;
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

export const getNumberUserStepsEntry = async () => {
  let returnValue = {
    userNumberStepsEntrys: 0,
    errorMsg: "",
  };

  try {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const { id: user_id } = user.value;

    if (!user.value) {
      throw new Error("User not logged in");
    }

    const { data: userStepsEntrys, error } = await supabase
      .from("steps")
      .select("steps, id, date, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    returnValue.userNumberStepsEntrys = Math.ceil(
      userStepsEntrys.length / size
    );
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};
