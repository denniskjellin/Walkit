export const getAllActivities = async () => {
  const supabase = useSupabaseClient();

  let returnValue = {
    activities: null,
    errorMsg: "",
  };

  try {
    const { data: allActivities, error } = await supabase
      .from("activities")
      .select("*")
      .order("activity", { ascending: true });

    if (error) throw error;
    // make first letter uppercase
    allActivities.forEach((activity) => {
      activity.activity =
        activity.activity.charAt(0).toUpperCase() + activity.activity.slice(1);
    });
    returnValue.activities = allActivities;
    return returnValue;
  } catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";
    return returnValue;
  }
};
