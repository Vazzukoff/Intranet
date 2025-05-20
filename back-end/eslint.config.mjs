import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";

export default [
  {
    files: ["**/*.ts"],
    plugins: {
      import: fixupPluginRules(_import),
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2022,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          distinctGroup: false,
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];
