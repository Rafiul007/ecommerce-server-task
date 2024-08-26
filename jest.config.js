module.exports = {
      testEnvironment: 'node', // Specifies the test environment as Node.js
      testMatch: ['**/tests/**/*.test.js'], // Match all test files within the tests directory
      collectCoverage: true, // Enable test coverage collection
      collectCoverageFrom: [
        'controllers/**/*.js',
        'middleware/**/*.js',
        'models/**/*.js',
        'routes/**/*.js',
        'utils/**/*.js',
      ],
      coverageDirectory: 'coverage', // Directory to output coverage reports
      setupFilesAfterEnv: ['./jest.setup.js'], // Path to setup file
    };
    