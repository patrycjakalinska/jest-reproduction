/** @type {import('jest').Config} */
module.exports = {
  modulePathIgnorePatterns: ['lib'],
  setupFiles: ['./jest-setup.js'],
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: [],
};
