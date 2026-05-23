export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1B3A2D",
          forest: "#2E6B3E",
          sage: "#7FB08A",
          cream: "#F7F2E8",
          parchment: "#EDE6D8",
          white: "#FDFAF5",
          brown: "#4A3B32",
          clay: "#A89080",
          gold: "#B8912A",
          ink: "#0F1A14",
          charcoal: "#0F1A14",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
