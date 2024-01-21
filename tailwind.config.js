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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "3xl": "1792px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
