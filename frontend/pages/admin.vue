<!-- pages/index.vue -->
<template>
  <div class="container">
    <div class="left-column">
      <article>
        <h1>Get data</h1>
        <ul>
      <li v-for="destination in destinations" :key="destination.id">
        Destination ID: {{ destination.from }}{{ destination.id }}
      </li>
    </ul>
      </article>
    </div>
    <div class="right-column">
      <article>
        <h1>hey</h1>
        <form class="form-admin">
          <div class="input-section">
          <label class="label-form" for="name">Name:</label>
          <input class="input-form" type="text" id="name" name="name" required />
        </div>
        <div class="input-section">
          <label class="label-form" for="email">Email:</label>
          <input class="input-form" type="email" id="email" name="email" required />
        </div>
          <label for="message">Message:</label>
          <textarea class="input-section" id="message" name="message" rows="5" required></textarea>

          <button class="button-submit" type="submit">Send</button>
        </form>
      </article>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
let destinations = [];

// fetch destinations from Supabase
const fetchDestinations = async () => {
  try {
    let { data: response, error } = await supabase
      .from("destinations")
      .select("*")
      .order("id", { ascending: true });

    if (response) {
      console.log(response);
      destinations = response;
    }
  } catch (error) {
    console.log(error);
  }
};

definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<style lang="scss" scoped>
/* add any custom styles for the form here */
form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}




</style>
