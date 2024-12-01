/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFFF0",
          100: "#FEFCF3",
          200: "#F5F0E1",
          300: "#E6DCC6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
