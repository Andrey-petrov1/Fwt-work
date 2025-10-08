module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  ignorePatterns: ["dist", "node_modules", "vite.config.ts"],
  rules: {
    "prettier/prettier": ["error", { semi: true, tabWidth: 2, singleQuote: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/no-named-as-default": "off",
  },
};
