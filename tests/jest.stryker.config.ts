/* eslint-disable */
import base from './jest.config';

// The tests/ suites as Stryker replays them (npm run test:mutation): its node environment reports
// which code each test covers. The mongo suite (skipped without a server) and the perf suites
// (too slow to replay for every mutant) are left out.
export default {
  ...base,
  testEnvironment: '@stryker-mutator/jest-runner/jest-env/node',
  testPathIgnorePatterns: ['/node_modules/', '/integrations/mongo/', '\\.perf\\.test\\.ts$'],
};
