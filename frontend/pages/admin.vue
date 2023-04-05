<!-- pages/index.vue -->
<template>
    <div class="container">
      <div class="left-column">
        <article>
          <h1>hey</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            libero nobis quos rerum totam exercitationem voluptatibus id numquam?
            Quasi ex libero fuga expedita facere cumque nostrum nesciunt,
            accusamus ipsa pariatur!
          </p>
        </article>
      </div>
      <div class="right-column">
        <article>
          <h1>hey</h1>
          <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
  
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
  
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
  
            <button type="submit">Send</button>
          </form>
        </article>
      </div>
    </div>
  </template>
  
  <script setup>
  const { auth } = useSupabaseAuthClient();
  const user = useSupabaseUser();
  
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
  
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0069d9;
  }
  
  button:active {
    background-color: #005cbf;
  }
  </style>
  