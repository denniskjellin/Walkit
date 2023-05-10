export const getAllActivitys = async () => {
    const supabase = useSupabaseClient();

    let returnValue = {
        allActivitys: [],
        errorMsg: "",
};

try {
    const { data: allActivitys, error } = await supabase
    .from("activities")
    .select("*")
    .order("activity", { ascending: false });
} catch (error) {
    returnValue.errorMsg = "Obs! Kunde inte hämta data.";   

}

};