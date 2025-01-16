import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#696969",
        third: "#f6f6f8",
        hunyadiYellow: "#FFBF69",
        white: "#F5F5F5",
        mintGreen: "#27A599",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
