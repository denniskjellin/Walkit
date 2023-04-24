// function to get all users from supabase and rank them towards amount of walked steps towards active destination
export const getProfiles = async () => {
    const supabase = useSupabaseClient();
    
    let returnValue = {
        profiles: "",
        errorMsg: "",
    };
    
    try {
        const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
      
    
        if (error) throw error;
    
        returnValue.profiles = profiles;
        returnValue.errorMsg = "";
    } catch (error) {
        returnValue.errorMsg = "Obs! Kunde inte hämta data.";
    }
    
    console.log(returnValue.profiles, "profiles")
    return returnValue;
    }


        