/* import { defineNuxtConfig } from 'nuxt' */

export default defineNuxtConfig({
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "@/assets/css/main.scss",
  ],
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],

  app: {
    head: {
      script: [
        {
          src: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js",
          integrity: "sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=",
          crossorigin: "",
          type: "text/javascript",
        },
      ],
      // setting title and meta tags for html document
      title: "Walkit | Knowit",
      meta: [
        {
          name: "description",
          content:
            "Walkit - logga dina steg och ta dig närmre din destination.",
        },
        {
          name: "theme-color",
          content: "#e4e1db",
        }
      ],
      htmlAttrs: {
        // setting language for html document
        lang: "sv",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css",

          crossorigin: "",
        },
      ],

      modules: [
        // Simple usage
        "nuxt-leaflet",

        // With options
        [
          "nuxt-leaflet",
          {
            /* module options */
          },
        ],
      ],
    },
  },
});
