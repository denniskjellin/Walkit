// function to get the logged in user steps for current day
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
