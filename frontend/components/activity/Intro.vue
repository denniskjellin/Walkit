<template>
  <div class="section-block-start section-sand">
    <div class="centered-container">
      <h1 class="h1-s">Aktivitetsslista</h1>
      <p>Här hittar du en översikt över olika aktiviteter och hur många steg de
        motsvarar per 30 minuter. Listan är till för att hjälpa dig att hålla koll
        på din fysiska aktivitet och ge dig en uppfattning om hur mycket du rör på
        dig under olika aktiviteter. Oavsett om du är ute efter att öka din
        fysiska aktivitet eller bara vill ha en bättre förståelse för hur olika
        aktiviteter påverkar din hälsa, är aktivitetslistan en användbar resurs
        för dig!
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/* Make the container appear in the center of the screen */
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  p {
    text-align: start;
  }
}

@media (max-width: 768px) {

  h1,
  h2 {
    font-size: 1.5rem;
  }
}
</style>
