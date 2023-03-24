// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
    ],
    /* Setings for Tailwind CSS */
    theme: {
      extend: {
        container: {
            center: true,
            screens: {
              lg: '1124px',
              xl: '1124px',
              '2xl': '1124px',
            },
          },
      },
    },
    /* Show Hex color in Tailwind variable on DevTools, instead of opacity. */
    corePlugins: {
        textOpacity: false,
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        placeholderOpacity: false,
        ringOpacity: false,
      },
    plugins: [],
  }