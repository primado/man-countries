/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {

      screens: {
        // // "2xl": {'max': '1440px'},
        "xl-1024": {'max': '1030px'},
        'xl-1080': {'max': '1085'},
        '2md': {'max': '770px'},
        'md-950': {'max': '950'},
        'md-943': {'max': '943px'},
        'sm-470': {'max': '475px'},
        'sm-425': {'max': '430px'},
        'sm-375': {'max': '379px'},
        'sm-320': {'max': '325px'},
      },

    },

    fontFamily: {
      nunito: ["Nunito", "sans-serif"],

    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
