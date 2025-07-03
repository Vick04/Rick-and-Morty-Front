const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],

  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "**/*.(test|spec).(ts|tsx|js|jsx)",
  ],

  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/layout.tsx",
    "!app/**/loading.tsx",
    "!app/**/error.tsx",
    "!app/**/not-found.tsx",
    "!app/**/*.stories.{ts,tsx}",
  ],

  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "coverage",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  clearMocks: true,

  verbose: true,
};

module.exports = createJestConfig(config);
