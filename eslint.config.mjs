// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import lichtblick from "@lichtblick/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import filenamesPlugin from "eslint-plugin-filenames";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "**/*.js",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.d.ts",
      ".pnp.*",
      ".yarn/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    files: ["**/*.ts"],
    plugins: {
      "@lichtblick": lichtblick,
      import: importPlugin,
      filenames: filenamesPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.test.json"],
      },
    },
    rules: {
      // Lichtblick rules
      "@lichtblick/license-header": ["error", { licenseType: "MPL-2.0" }],
      "@lichtblick/strict-equality": "error",
      "@lichtblick/no-return-promise-resolve": "error",

      // TypeScript rules
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      // Import rules
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // Prettier
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.test.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
  },
  {
    files: ["src/builders/**/*.ts", "src/utilities.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
];
