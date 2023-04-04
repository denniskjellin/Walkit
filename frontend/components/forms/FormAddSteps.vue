<template>
    <form class="add-steps-form">
      <h2>Registrera steg</h2>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="date">Datum</label>
        <input
          class="input-add-steps-form"
          id="date"
          ref="test"
          type="date"
          v-model="date"
        /> 
      </div>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="steps">Antal steg</label>
        <input
          class="input-add-steps-form"
          id="steps"
          type="number"
          v-model="steps"
          
        /> 
      </div>
      <div class="add-steps-form__submit input-label-container">
        <button @click.prevent="insertSteps" class="btn-bg-clay-black">
          Lägg till <i class="fas fa-plus"></i>
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
      const supabase = useSupabaseClient();

      const date = ref(null);
      const steps = ref(0);
  
      const insertSteps = async () => {
        try {
          console.log(date.value);
          console.log(steps.value);

          const { data, error } = await supabase
            .from("steps")
            .insert([{ date: date.value, steps: steps.value, user_id: "98da1930-5d24-4e2d-ac5f-d6f0bfa6ce63", destination_id: "86ee5f9b-31eb-46ca-b6ec-ff848f845e46" }]);
  
          if (error) throw error;
          alert("Steg tillagda!");
        } catch (error) {
          console.log("Error inserting steps:", error.message);
          alert("Error inserting steps!");
        }
      };
  </script>
  