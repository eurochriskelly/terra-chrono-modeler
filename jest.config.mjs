export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
   transform: {
     '^.+\\.m?jsx?$': 'babel-jest',
     '^.+\\.m?js?$': 'babel-jest',
     '^.+\\.tsx?$': 'ts-jest',
     '^.+\\.ts?$': 'ts-jest',
  },
};
