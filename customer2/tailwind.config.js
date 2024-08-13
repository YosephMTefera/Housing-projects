/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm2:"400px",
      sm1: "600px",
      md1: "700px",
      md2: "800px",
      lg: "1000px",
      lg1: "1200px",
      lg2: "1500px",
    },
    extend: {},
  },
  plugins: [],
}