export default {
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.hs$": "babel-jest",
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: 'jest-environment-node',
};
