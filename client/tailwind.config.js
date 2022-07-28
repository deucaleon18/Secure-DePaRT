/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/*.{jsx,ts,js,tsx}",
    "./components/*.{jsx,ts,js,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["EuclidRegular"],
        100: ["EuclidRegular"],
        700: ["EuclidBold"],
      },
      colors: {
        primary: "#F0137D",
      },
    },
  },
  plugins: [],
};
