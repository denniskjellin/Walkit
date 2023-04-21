// function to get the logged in user steps for current day (user-daily-steps)
export const getUserSteps = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // get todays date and format it to YYYY-MM-DD format
  let currentDate = new Date().toISOString().slice(0, 10);

  // return values
  let returnValue = {
    userSteps: 0,
    errorMsg: "",
    currentDate: currentDate,
  };

  // get steps for user current day
  try {
    const { data: stepsData, error } = await supabase
      .from("steps")
      .select("steps")
      .eq("user_id", user.value.id)
      .eq("date", currentDate);

    if (error) throw error;

    // sum all steps for current day for logged in user
    let stepsSum = stepsData.reduce(
      (total, current) => total + current.steps,
      0
    );

    // set return values
    returnValue.userSteps = stepsSum;
    returnValue.errorMsg = "";
    //   console.log(returnValue.userSteps, "dagens steg!");
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// function to get all user steps for current day (all-daily-steps)
export const getAllSteps = async () => {
  const supabase = useSupabaseClient();

  // get todays date and format it to YYYY-MM-DD format
  let currentDate = new Date().toISOString().slice(0, 10);

  // return values
  let returnValue = {
    allUserSteps: 0,
    errorMsg: "",
    currentDate: currentDate,
  };

  // get all user steps where destination is_active
  try {
    const { data: destinationsData, error } = await supabase
      .from("destinations")
      .select("is_active, steps(steps, date)")
      .eq("is_active", true)
      .eq("steps.date", currentDate);

    let allStepsSum = 0;
    destinationsData.forEach((destinationData) => {
      if (destinationData.is_active) {
        destinationData.steps.forEach((step) => {
          allStepsSum += step.steps;
        });
      }
    });

    if (error) throw error;

    // set return values
    returnValue.allUserSteps = allStepsSum;
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }
  return returnValue;
};


