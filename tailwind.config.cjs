/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {

      colors: {
        'dark-blue': "hsl(209, 23%, 22%)",
        'very-dark-blue': "hsl(207, 26%, 17%)",
        'very-dark-blue-text': "hsl(200, 15%, 8%)",
        'dark-gray': "hsl(0, 0%, 52%)",
        'very-light-gray': "hsl(0, 0%, 98%)",
        'white-mode': "hsl(0, 0%, 100%)",
      },

      screens: {
        // // "2xl": {'max': '1440px'},
        "xl-1024": {'max': '1030px'},
        'xl-1045': {'max': '1050px'},
        'xl-1080': {'max': '1085'},
        '2md': {'max': '770px'},
        'md-950': {'max': '950'},
        'md-910': {'max': '968px'}, // 'md-910': {'max': '949px'},
        'md-943': {'max': '949px'},
        'md-540': {'max': '545px'},
        'sm-470': {'max': '479px'},
        'sm-425': {'max': '430px'},
        'sm-390': {'max': '395px'},
        'sm-375': {'max': '379px'},
        'sm-360': {'max': '365px'},
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
