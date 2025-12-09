// @ts-check
import lichtblick from "@lichtblick/eslint-plugin";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "**/*.js", "**/*.d.ts"],
  },
  lichtblick.configs.base,
  ...lichtblick.configs.typescript.map((/** @type {any} */ config) => ({
    ...config,
    files: ["**/*.ts"],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      ...config.rules,
      "@lichtblick/license-header": ["error", { licenseType: "MPL-2.0" }],
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_.",
          argsIgnorePattern: "^_.",
        },
      ],
    },
  })),
  {
    files: ["**/*.test.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.test.ts"],
        },
      },
    },
  },
  {
    files: ["src/builders/**/*.ts", "src/utilities.ts"],
    rules: {
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
);
