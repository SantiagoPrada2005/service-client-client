import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

<<<<<<< HEAD
const eslintConfig = [...compat.extends("next/core-web-vitals")];
=======
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
>>>>>>> dc81dff9021a36970f8b2d76a50349a0e81db862

export default eslintConfig;
