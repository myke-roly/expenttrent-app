module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^api/(.*)$': '/src/api/$1',
    '^common-app/(.*)$': '/src/common-app/$1',
    '^app/(.*)$': '/src/app/$1',
    '^layout/(.*)$': '/src/layout/$1',
    '^components/(.*)$': '/src/pods/$1',
    '^scenes/(.*)$': '/src/scenes/$1',
  },
};
