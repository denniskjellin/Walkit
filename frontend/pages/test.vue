<template>
    <div>
<h1>test</h1>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

console.log(supabase);

  const fetchSteps = async () => {
    try {
      let { data: steps, error } = await supabase
        .from("steps")
        .select("*")
        .order("id", { ascending: true });

        if (steps) {
          console.log(steps)
        }
    } catch (error){
      console.log(error);
    }
  }

  fetchSteps();

</script>

<style lang="scss" scoped>

</style>