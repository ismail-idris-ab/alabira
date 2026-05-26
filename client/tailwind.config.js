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
      fontSize: {
        eyebrow: "11px",
        "scroll-label": "10px",
        cta: "13.5px",
        hero: "clamp(3.25rem, 8.5vw, 6.75rem)",
        "body-fluid": "clamp(0.9375rem, 1.8vw, 1.0625rem)",
      },
      letterSpacing: {
        editorial: "0.22em",
        cta: "0.03em",
        "tight-heading": "-0.03em",
      },
      maxWidth: {
        content: "820px",
        sub: "460px",
      },
      backgroundImage: {
        hero: "url('/images/hero.webp'), url('/images/hero.jpg')",
        "hero-overlay":
          "linear-gradient(160deg, rgba(15,26,20,0.65) 0%, rgba(15,26,20,0.35) 45%, rgba(15,26,20,0.72) 100%)",
        "scroll-line":
          "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
      },
    },
  },
  plugins: [],
};
