/* import { defineNuxtConfig } from 'nuxt' */

export default defineNuxtConfig({

  css: ['@/assets/css/tailwind.css', '@fortawesome/fontawesome-free/css/all.css', '@/assets/css/main.scss'],
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],

  app: {
    head: {
      // setting title and meta tags for html document
      title: 'Walkit | Knowit',
      meta: [{ name: "description", content: "Walkit - logga dina steg och ta dig närmre din destination." }],
      htmlAttrs: {
        // setting language for html document
        lang: "sv",
      },
    }
    
  },

})
