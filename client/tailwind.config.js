/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to top, rgba(17,94,89,0.1),rgba(17,94,89,0.5), rgba(17,94,89,1)), url('./src/assets/imgs/flight2.jpg')",
      },
    },
  },
  plugins: [],
};
