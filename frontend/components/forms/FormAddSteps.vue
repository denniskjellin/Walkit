<template>
    <form class="add-steps-form">
      <h2>Registrera steg</h2>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="date">Datum</label>
        <input class="input-add-steps-form" id="date" type="date" v-model="date" />
      </div>
      <div class="input-label-container">
        <label class="label-add-steps-form" for="steps">Antal steg</label>
        <input class="input-add-steps-form" id="steps" type="number" v-model="steps" />
      </div>
      <div class="add-steps-form__submit input-label-container">
        <button @click.prevent="insertSteps" class="btn-bg-clay-black">
          Lägg till <i class="fas fa-plus"></i>
        </button>
      </div>
    </form>
  </template>
  
  <script>


  export default {

  }
  </script>
  