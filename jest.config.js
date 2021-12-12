module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,vue}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/src/_dev/**",
    "!**/*.config.{js,ts}",
    "!**/src/index.ts",
    "!**/src/main.ts"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.vue$": "vue-jest"
  },
  testURL: "http://localhost/"
};
