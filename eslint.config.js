import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["src/**/*.{js,vue}"], // Only cover the src folder
    languageOptions: {
      globals: globals.browser,
      sourceType: "module", // Vite uses ES modules
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      'comma-dangle': ["warn", "never"], // Warn on trailing commas after objects or variables
      'eqeqeq': ["error", "always"], // Checks data type and content
      'indent': ["error", 2], // Requires 2 spaces for indentation
      'no-eval': ["error"], // Don't use eval()
      'no-unused-vars': ["error"], // No unused variables
      'no-var': ["error"], // No use of variable declaration using "var"
      'prefer-const': ["error"], // Use const over let if possible
      'semi': ["error", "always"], // Always semicolon at the end of line
      'brace-style': ["error", "1tbs"], // Use 1tbs (One True Brace Style)
      'no-shadow': ["error", { "builtinGlobals": true }], // Don't write block-scoped variables with the same name as a global-scoped variable
      'arrow-body-style': ["error", "always"], // Explicitly write the curly brackets and return statement in an arrow function
      'consistent-return': "warn", // Enforce consistent return statements in functions. Either always return a value or never return a value
      'max-params': ["warn", 3], // Warn when a function has more than 3 parameters
      'no-async-promise-executor': "error", // Disallow async functions as Promise executors

      // Vue specific
      'vue/multi-word-component-names': "off", // Allow single-word component names
      'vue/component-name-in-template-casing': ["error", "PascalCase"], // Enforce PascalCase for component names in templates
      'vue/no-v-html': "warn", // Warn on use of v-html to prevent XSS vulnerabilities
    },
  },
]);