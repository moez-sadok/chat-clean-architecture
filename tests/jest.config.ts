/* eslint-disable */
export default {
  displayName: 'chat-test',
  preset: '../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: './tests/tsconfig.spec.json',
    },
   //fetch 
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  // docs/features is a root and 'feature' an extension only so that watch mode
  // re-runs the BDD steps when a .feature file changes
  roots: ['<rootDir>', '<rootDir>/../docs/features'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'feature'],
  // *.steps.ts bind the BDD features of docs/features (jest-cucumber)
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '**/*.steps.ts'],
  coverageDirectory:
    '../tests',
};
