/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
