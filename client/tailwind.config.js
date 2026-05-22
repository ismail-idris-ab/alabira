export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2E6B3E",
          sage: "#7FB08A",
          cream: "#F5F0E6",
          white: "#FDFAF5",
          brown: "#4A3B32",
          clay: "#A89080",
          gold: "#C9952A",
          charcoal: "#1E1E1E",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
