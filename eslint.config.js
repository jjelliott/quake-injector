import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import react from "eslint-plugin-react";
import tsc from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin';

export default tsc.config(
  // react.configs["jsx-runtime"],
  js.configs.recommended,
  ...tsc.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "react": react,
      "@stylistic/js": stylisticJs
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    languageOptions: {

      ...reactRecommended.languageOptions,
      ...jsxRuntime.languageOptions,
      globals: {
        ...globals.browser
      },
      sourceType: "module",
      ecmaVersion: "latest"
    },
    rules: {
      ...reactRecommended.rules,
      ...jsxRuntime.rules,
      "@stylistic/js/semi": ["error", "always"],
      // "no-unused-vars": "error",
      "react/prop-types": 0
    }
  });