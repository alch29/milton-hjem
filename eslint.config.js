import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: 
    { 
      globals: globals.browser 
    },
    rules: {
      'comma-dangle': ["error", "never"], // traling comma after objects or variables
      'eqeqeq': ["error", "always"], // checks data type and content
      'indent': ["error", 2], // requires 2  spaces for indentation.
      'no-eval': ["error"], // don’t use eval()
      'no-unused-vars': ["error"], // No unused variables.
      'no-var': ["error"], // no use of variable declaration using “var”
      'prefer-const': ["error"], // use const over let if possible
    //   'quotes': ["error", "single"], // single quotes
      'semi': ["error", "always"], // Always semi-colon at the end of line.
      'brace-style': ["error", "1tbs"], // Use 1tbs (One true brace style).
      'no-shadow': ["error", { "builtinGlobals": true }], // Don't write block-scoped variables, with the same name as a global-scoped variable.
      'arrow-body-style': ["error", "always"], // Explicitly write the curly brackets and return statement in an arrow function.
    }, 
  },
  { 
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);