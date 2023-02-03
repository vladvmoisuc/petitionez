/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "app",
  coverageDirectory: "../coverage",
  fakeTimers: {
    enableGlobally: true,
  },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/mocks/css.json",
  },
  setupFiles: ["../setupTests.ts"],
};
