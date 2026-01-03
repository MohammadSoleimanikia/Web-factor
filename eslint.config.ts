import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: globals.browser,
            parser: "@typescript-eslint/parser",
        },
        plugins: {
            react,
            "@typescript-eslint": tseslint,
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "off", // allow any
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        extends: [
            "plugin:@typescript-eslint/recommended",
            "eslint:recommended",
            "plugin:react/recommended",
        ],
    },
]);
