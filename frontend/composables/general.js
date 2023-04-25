// function to format numbers to Swedish format
export function numberToSweString(number) {
  return number.toLocaleString("sv-SE", { minimumFractionDigits: 0 });
}

// Get user initials from full_name from Supabase profile table
export const getUser = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Get the user ID
  const { id: user_id } = user.value;

  if (!user.value) {
    throw new Error("User not logged in");
  }

  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id);

    if (error) throw error;

    // returnValue.user = userFullName[0].full_name;

    // get initials of the user
    // const fullNameArray = returnValue.userFullName.split(" ");
    // const firstName = fullNameArray[0];
    // const lastName = fullNameArray[fullNameArray.length - 1];
    // const initials = firstName[0] + lastName[0];
    // returnValue.initials = initials.toUpperCase();

    // console.log(returnValue.userFullName, "user full name");
    // console.log(returnValue.initials, "user initials");
    console.log(user[0].full_name, "user");
    return user[0];
  } catch (error) {
    console.log = "User initials not found";
  }

};

