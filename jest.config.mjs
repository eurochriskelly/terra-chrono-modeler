export default {
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: 'jest-environment-node',
};
/*


ordovician: #2aa78e
silurian: #b2ddca
devonian: #ce9c5b

*/
