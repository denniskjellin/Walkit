<template>
  <section class="section-block section-goal">
    <SvgGoalblockIco class="goalblock-ico"/>
    <h2 class="h2-s">Målet</h2>
    <p>{{ destinationSumData.from }} - {{ destinationSumData.to }}</p>
    <p>{{ destinationSumData.km }} km</p>
    <p>{{ totalStepsData.totalSteps }} steg</p>
  </section>
</template>

<script setup>
const supabase = useSupabaseClient();

let { data: destinations, error } = await supabase
  .from("destinations")
  .select("from, to")
  .eq("is_active", true);

  let totalStepsData = useState("totalStepsData", () => {
  return {
    totalSteps: 1,
  };
});

let destinationSumData = useState("destinationSumData", () => {
  return {
    to: "",
    from: "",
    steps_goal: 0,
    is_active: false,
    km: 0,
  };
});



onMounted(async () => {
  totalStepsData.value = await getTotalSteps();
  destinationSumData.value = await destinationSum();
});
</script>
