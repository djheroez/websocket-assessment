module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["prettier"],
  plugins: ["prettier", "import", "babel"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "max-len": ["error", { code: 120 }],
    "no-underscore-dangle": "off",
    "no-unexpected-multiline": "off",
    "import/first": 2,
    "import/exports-last": 2,
    "import/newline-after-import": 2,
    "import/no-duplicates": 2,
    "import/no-namespace": 2,
    "import/no-named-default": 2,
    "import/no-extraneous-dependencies": "off",
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" }
    ]
  }
};
