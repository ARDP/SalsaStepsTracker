import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import reactPlugin from "eslint-plugin-react"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["v1-rest/backend/**/*.{ts,cts,mts}"], // only backend
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.rules,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },

  {
    files: ["apps/web/**/*.{ts,tsx}"], // only web
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.rules,
      react: reactPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
])
