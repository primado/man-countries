/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        // // "2xl": {'max': '1440px'},
        "xl-1024": {'max': '1024px'},
        '2md': {'max': '768px'},
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
  plugins: [],
}
