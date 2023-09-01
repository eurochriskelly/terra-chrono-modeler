export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  rootDir: "src",
};
