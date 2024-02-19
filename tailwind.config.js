/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json", "./layouts/**/*.{html,js}", "./content/**/*.md", "assets/js/**/*.js"],
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("@tailwindcss/typography")],
};
