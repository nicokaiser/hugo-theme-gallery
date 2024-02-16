const tailwindConfig = process.env.HUGO_FILE_TAILWIND_CONFIG_JS || "./tailwind.config.js";
const tailwind = require("tailwindcss")(tailwindConfig);
const autoprefixer = require("autoprefixer");
const atImport = require("postcss-import");

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [atImport, tailwind, autoprefixer],
};
