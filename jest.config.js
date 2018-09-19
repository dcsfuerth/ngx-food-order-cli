module.exports = {
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },

  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  globals: {
    'ts-jest': {
      babelConfig: false,
      diagnostics: false,
    },
    __TRANSFORM_HTML__: true,
  },

  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  testMatch: ['<rootDir>/projects/**/*.spec.ts', '<rootDir>/src/**/*.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],

  moduleNameMapper: {
    '@dcs/ngx-tools/testing': '<rootDir>projects/dcs/ngx-tools/testing/src/public_api.ts',
    '@dcs/ngx-tools': '<rootDir>/projects/dcs/ngx-tools/src/public_api.ts',
  },
};
