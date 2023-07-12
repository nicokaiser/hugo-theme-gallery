const atImport = require("postcss-import");
const tailwind = require("tailwindcss")(process.env.HUGO_FILE_TAILWIND_CONFIG_JS || "./tailwind.config.js");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [atImport, tailwind, autoprefixer],
};
