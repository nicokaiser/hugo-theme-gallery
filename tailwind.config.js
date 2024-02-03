const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json", "./layouts/**/*.html"],
  darkMode: "class",
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    extend: {
      colors: {
        "base-100": "hsl(var(--b1) / <alpha-value>)",
        "base-200": "hsl(var(--b2) / <alpha-value>)",
        "base-content": "hsl(var(--bc) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
