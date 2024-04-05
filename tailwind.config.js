/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Poppins','san-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/assets/home.jpg')",
      }
    },
  },
  plugins: [],
}

