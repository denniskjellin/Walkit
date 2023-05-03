// function to get user based stats on steps for current
export const getUserWeeklyStats = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  if (!user.value) {
    throw new Error("User not logged in");
  }

  // Get the user ID
  const { id: user_id } = user.value;
  let returnValue = {
    stepsCurrWeekUser: 0,
    errorMsg: "",
    currentWeekNumber: "",
    dailySteps: [],
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
    // Query the database for steps taken by the current user in the current week
    const { data: allStepsCurrWeek, error } = await supabase
      .from("steps")
      .select("steps, user_id, date")
      .gte("date", startOfWeek.toISOString())
      .lte("date", endOfWeek.toISOString())
      .order("date");

    if (error) throw error;

    // Filter out steps taken by other users in the current week
    const stepsCurrWeekCurrentUser = allStepsCurrWeek.filter(
      (step) => step.user_id === user_id
    );

    // Sum all steps taken by the current user for the current week
    const stepsSumUser = stepsCurrWeekCurrentUser.reduce(
      (total, current) => total + current.steps,
      0
    );

    // Group steps taken by date
    const stepsByDate = stepsCurrWeekCurrentUser.reduce((acc, curr) => {
      const date = curr.date.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.steps;
      return acc;
    }, {});

    // Generate daily steps array
    const dailySteps = [];
    // set start date
    const start = new Date(startOfWeek);
    // while start is less than the endOfWeek date, add one day to start and push date and steps to dailySteps array, split date to only get the date and not the time
    while (start <= endOfWeek) {
      const date = start.toISOString().split("T")[0];
      const steps = stepsByDate[date] || 0;
      dailySteps.push({ date, steps });
      start.setDate(start.getDate() + 1);
    }

    // Set return values
    returnValue.stepsCurrWeekUser = stepsSumUser;
    returnValue.errorMsg = "";
    returnValue.currentWeekNumber = currentWeekNumber;
    returnValue.dailySteps = dailySteps;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data";
  }
  return returnValue;
};
