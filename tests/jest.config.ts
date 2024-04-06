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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../tests',
};
