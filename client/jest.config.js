export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "import.meta": {},
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};