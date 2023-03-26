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
        colors: {
          // Primary theme colors for Walkit/Knowit, 500 is the base color.
          primablack: {
            50: '#F5F5F5',
            100: '#E0E0E0',
            200: '#C6C6C6',
            300: '#ADADAD',
            400: '#8E8E8E',
            500: '#333333', // Primary black - Base 
            600: '#282828',
            700: '#202020',
            800: '#171717',
            900: '#0F0F0F',
          }, 
          primawhite: {
            50: '#FFFFFF',
            100: '#FEFEFE',
            200: '#FDFDFD',
            300: '#FBFBFB',
            400: '#F6F6F6',
            500: '#F1F0ED', // Primary white - Base
            600: '#E3E3E0',
            700: '#BFBFBD',
            800: '#9B9B99',
            900: '#7A7A78',
          },
          primapear: {
            50: '#FFFFFF',
            100: '#F7FFF7',
            200: '#E8FFE8',
            300: '#D9FFD9',
            400: '#BFFFBF',
            500: '#B7DEBD', // Primary pear
            600: '#9DC69C',
            700: '#7FAE7E',
            800: '#62965F',
            900: '#4F7C4B',
          },
          primaforest: {
            50: '#F3F5F3',
            100: '#E1E4E1',
            200: '#C4C9C4',
            300: '#A8ADA8',
            400: '#7C857C',
            500: '#4B6455', // Primary forest
            600: '#435A4D',
            700: '#374C3F',
            800: '#2A3E32',
            900: '#1E3025',
          }, 
          primapebble: {
            50: '#FFFFFF',
            100: '#FEFEFE',
            200: '#FDFDFD',
            300: '#FBFBFB',
            400: '#F6F6F6',
            500: '#F1F0ED', // Primary pebble
            600: '#E3E3E0',
            700: '#BFBFBD',
            800: '#9B9B99',
            900: '#7A7A78',
          }, 
          primamint: {
            50: '#FFFFFF',
            100: '#F8FFF8',
            200: '#E3FFE3',
            300: '#CDFFCD',
            400: '#A6FFA6',
            500: '#DBEEDE', // Primary mint green
            600: '#C6E5C6',
            700: '#8DA98D',
            800: '#669E66',
            900: '#4D804D',
          },
          primaclay: {
            50: '#F8FAF8',
            100: '#EDF1ED',
            200: '#D9E0D9',
            300: '#C5D0C5',
            400: '#9EA99E',
            500: '#A5B1AA', // Primary clay green
            600: '#8D9992',
            700: '#6F7A74',
            800: '#505B55',
            900: '#404A45',
          }, 
          primasand: {
            50: '#FFFFFF',
            100: '#FEFEFE',
            200: '#FDFDFD',
            300: '#FBFBFB',
            400: '#F6F6F6',
            500: '#E4E1DB', // Primary sand beige
            600: '#D6D3CC',
            700: '#BEBAB2',
            800: '#A6A298',
            900: '#8C8A80',
          },
          primaflamingo: {
            50: '#FEF2F0',
            100: '#FEE6E1',
            200: '#FEC7BE',
            300: '#FEA99C',
            400: '#FE6C58',
            500: '#FAC0B1', // Primary flamingo pink
            600: '#F8988E',
            700: '#F56B62',
            800: '#F33E37',
            900: '#F02721',
          },
          primamelon: {
            50: '#FFFFFF',
            100: '#FFF7F5',
            200: '#FFEBE5',
            300: '#FFDCCF',
            400: '#FFCDBA',
            500: '#FCDFD8', // Primary melon
            600: '#FAC8B5',
            700: '#F7B18F',
            800: '#F49968',
            900: '#F17E3E',
          },
          primaloli: {
            50: '#FFF0FF',
            100: '#FFD6FF',
            200: '#FFB3FF',
            300: '#FF8FFF',
            400: '#FF6CFF',
            500: '#FF00FF', // Primary light purple - Base
            600: '#F200F2',
            700: '#D900D9',
            800: '#BF00BF',
            900: '#A500A5',
          },
          primaleather: {
            50: '#f9e9ea',
            100: '#f2c9cd',
            200: '#e89ba1',
            300: '#df6c76',
            400: '#d63d4a',
            500: '#7c3647', // Primary leather - Base
            600: '#6c2f40',
            700: '#5c2938',
            800: '#4d2231',
            900: '#3d1c29',
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
}