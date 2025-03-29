import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the directory and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a FlatCompat instance
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js Core Web Vitals and TypeScript Config
  ...compat.extends(
    "next/core-web-vitals",
    "next",
    "plugin:@typescript-eslint/recommended"
  ),

  // Custom ESLint Rules
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply rules only to TypeScript files
    rules: {
      // Disable 'no-explicit-any' to prevent build errors
      "@typescript-eslint/no-explicit-any": "off", // or "warn" if you want warnings

      // Optional: Add more custom rules here
      "react/react-in-jsx-scope": "off", // No need to import React in Next.js
      "no-console": "warn", // Warn for console.log usage
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable module boundary types check
    },
  },

  // Ignore unnecessary files
  {
    ignores: ["node_modules/", "build/", "dist/", ".next/"],
  },
];

export default eslintConfig;
