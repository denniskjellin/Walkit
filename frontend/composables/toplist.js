// fetch all users from supabase
export const getAllUsers = async () => {
  const supabase = useSupabaseClient();

  let returnValue = {
    allUsers: [],
    errorMsg: "",
  };

  try {
    const { data: allUsers, error } = await supabase
      .from("profiles")
      .select("id, full_name");

    if (error) throw error;

    returnValue.allUsers = allUsers;
    console.log(returnValue.allUsers, "all users");
    return returnValue;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }
};

// fetch all steps from supabase to top-list
export const getToplistSteps = async () => {
  const supabase = useSupabaseClient();

  let returnValue = {
    allSteps: [],
    errorMsg: "",
  };

  try {
    const { data: allSteps, error } = await supabase
    .from("destinations")
    .select("steps(steps, user_id)")
    .eq("is_active", true)
   

    if (error) throw error;

    returnValue.allSteps = allSteps[0].steps;
    console.log(returnValue.allSteps, "all steps");
    return returnValue;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
  }
};

