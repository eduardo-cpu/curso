import nextConfig from "eslint-config-next/core-web-vitals";
import jestPlugin from "eslint-plugin-jest";
import prettierConfig from "eslint-config-prettier";

export default [
  ...nextConfig,
  jestPlugin.configs["flat/recommended"],
  prettierConfig,
];
