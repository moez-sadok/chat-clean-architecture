// Cucumber runs the BDD specs in docs/features against the step definitions in tests/features.
module.exports = {
  default: {
    paths: ['docs/features/**/*.feature'],
    require: ['tests/features/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
  },
};
