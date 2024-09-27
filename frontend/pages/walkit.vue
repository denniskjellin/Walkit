<template>
  <WalkitHeroImg />
  <div class="section-block-start">
    <h1 class="h1-s">Vad är Walkit?</h1>
    <p>
      Walkit är en app framtagen för att främja aktivitet och rörelse bland medarbetare på kontoret. Genom ett intuitivt gränssnitt kan användare
      logga sina steg, tävla mot varandra, eller samarbeta för att nå gemensamma mål och destinationer. För att inkludera en bredare variation av
      fysisk aktivitet kan andra aktiviteter enkelt omvandlas till steg.
    </p>
  </div>
  <div class="section-block-start section-mint">
    <h2 class="h1-s">Tekniker som används</h2>
    <p>
      Walkit är byggt med Nuxt 3 för en smidig och modern utvecklingsmiljö. Stilmallen är skapad med Sass och egenutvecklad CSS, vilket ger en
      flexibel och optimerad design. För databashantering används Supabase, vilket möjliggör säker och effektiv lagring och hantering av användardata.
    </p>
  </div>
  <div class="section-block-start section-pear">
    <h2 class="h1-s">Walkit</h2>
    <p>
      Walkit skapades som ett examensarbete på Knowit av fullstack-utvecklaren Dennis Kjellin, med design av Nicholine Woznicki, grafisk designer.
      Båda är studenter vid Mittuniversitetet.
    </p>
  </div>
  <!-- Rounded image -->
  <div class="section-block section-sand p-6">
    <h2 class="h1-s mb-4">Kontakt</h2>
    <div class="flex items-center mb-4">
      <img src="/assets/images/dennis-kjellin.png" alt="Dennis Kjellin" class="w-24 h-24 rounded-full object-cover mr-4" />
      <div>
        <p class="font-bold text-lg">Dennis Kjellin</p>
        <p class="text-gray-700">dennis.kjellin@knowit.se</p>
        <a href="https://www.linkedin.com/in/denniskjellin/" target="_blank" class="text-blue-600 hover:underline flex items-center">
          <i class="fab fa-linkedin mr-2"></i>
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {

  h1,
  h2 {
    font-size: 1.5rem;
  }
}
</style>
