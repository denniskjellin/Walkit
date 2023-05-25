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

    return user[0];
  } catch (error) {
    throw error;
  }
};
