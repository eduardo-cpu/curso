const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testTimeout: 60000,
};

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  return {
    ...jestConfig,
    transformIgnorePatterns: ["/node_modules/(?!(node-pg-migrate)/)"],
  };
};
