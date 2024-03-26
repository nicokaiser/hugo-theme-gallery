/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["prettier-plugin-go-template", "prettier-plugin-organize-attributes", "prettier-plugin-css-order"],
  printWidth: 1000,
  tabWidth: 2,
  overrides: [
    {
      files: ["*.html"],
      options: {
        parser: "go-template",
      },
    },
  ],
  cssDeclarationSorterCustomOrder: ["concentric-css"],
};
