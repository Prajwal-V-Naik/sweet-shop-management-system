const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", 
  },
  transform: {
    ...tsJestTransformCfg,
  },
};