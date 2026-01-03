import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        ignores: [
            "build/**",
            "dist/**",
            ".next/**",
            "out/**",
            "node_modules/**",
            ".react-router/**",
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "react/react-in-jsx-scope": "off",

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-expressions": "off",

            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
