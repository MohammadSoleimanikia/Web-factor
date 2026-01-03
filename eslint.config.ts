import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            parser: "@typescript-eslint/parser",
            globals: globals.browser,
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
        plugins: {
            react,
            "@typescript-eslint": tseslint,
            "simple-import-sort": simpleImportSort,
        },
        extends: [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:@typescript-eslint/recommended",
        ],
        rules: {
            "react/react-in-jsx-scope": "off", // React 17+ JSX doesn’t need import React
            "@typescript-eslint/no-explicit-any": "off", // allow any type
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            // optional: disable other conflicting sorting rules
            "sort-imports": "off",
            "import/order": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
