// Description: This file contains functions to get the sum of all steps for the current day and the current week, used in 'top-listblock.vue'

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

    // set return values
    returnValue.userSteps = stepsSum;
    returnValue.errorMsg = "";
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

// function to get all user steps for current week (all-weekly-steps)
export const getAllStepsWeek = async () => {
  const supabase = useSupabaseClient();
  let returnValue = {
    stepsCurrWeek: 0,
    errorMsg: "",
    weekStart: "",
    currentWeekNumber: "",
  };

  // Get the current week number
  const now = new Date(); // current date
  const weekStart = 1; // 1 = Monday as start day (0 = Sunday)
  const day = now.getDay(); // current day
  const diffDay = now.getDate() - day + (day === 0 ? -6 : weekStart); // correct for day 0 (sunday)
  const startOfWeek = new Date(now.setDate(diffDay)); // set the date to the first day of the week
  const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

  // Get the current week number to write out on screen
  let currentWeekNumber = getWeek(startOfWeek);
  function getWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  try {
    // Query the database for steps in the current week
    const { data: stepsCurrWeek, error } = await supabase
      .from("steps")
      .select("steps")
      .gte("date", startOfWeek.toISOString())
      .lte("date", endOfWeek.toISOString())
      .order("date");

    if (error) throw error;

    // Sum all steps for the current week
    let stepsSum = stepsCurrWeek.reduce(
      (total, current) => total + current.steps,
      0
    );
    // set return values
    returnValue.stepsCurrWeek = stepsSum;
    returnValue.errorMsg = "";
    returnValue.currentWeekNumber = currentWeekNumber;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// function to get all user steps for current month (all-monthly-steps) // showed and used in @SummaryCirclesProfile
export const getUserMonthlySteps = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  if (!user.value) {
    throw new Error("User not logged in");
  }

  // Get the user ID
  const { id: user_id } = user.value;
  let returnValue = {
    stepsCurrMonthUser: 0,
    errorMsg: "",
    month: "",
  };

  const now = new Date(); // current date
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const capitalizedMonth =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  try {
    // Query the database for steps in the current month
    const { data: stepsCurrMonthUser, error } = await supabase
      .from("steps")
      .select("steps, date")
      .eq("user_id", user_id)
      .gt("date", firstDay.toISOString().split("T")[0]) // greater than or equal to first day of current month
      .lte("date", lastDay.toISOString().split("T")[0]); // less than or equal to last day of current month

    if (error) throw error;

    // Sum all steps for the current month
    let stepsSumUser = stepsCurrMonthUser.reduce(
      (total, current) => total + current.steps,
      0
    );

    // set return values
    returnValue.month = capitalizedMonth;
    returnValue.stepsCurrMonthUser = stepsSumUser;
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};

// get all steps ever for current user (all-time-steps)
export const getAllTimeStepsUser = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // return values
  let returnValue = {
    stepsAllTimeUser: 0,
    errorMsg: "",
  };
  if (!user.value) {
    throw new Error("User not logged in");
  }

  // Get the user ID
  const { id: user_id } = user.value;

  // Query the database for steps in the current week
  try {
    const { data: stepsAllTimeUser, error } = await supabase
      .from("steps")
      .select("steps")
      .eq("user_id", user_id);

    if (error) throw error;

    // Sum all steps for the user
    let stepsSumUser = stepsAllTimeUser.reduce(
      (total, current) => total + current.steps,
      0
    );

    // set return values
    returnValue.stepsAllTimeUser = stepsSumUser;
    returnValue.errorMsg = "";
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }

  return returnValue;
};
