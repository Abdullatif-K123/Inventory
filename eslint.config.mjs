import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
   {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',  // Disable unused-vars rule
      '@typescript-eslint/no-explicit-any': 'off',  // Disable any type rule
      'next/next/no-img-element': 'off',  // Disable img element rule
      'jsx-a11y/alt-text': 'off',  // Disable alt-text rule
    },
  },
];

export default eslintConfig;
