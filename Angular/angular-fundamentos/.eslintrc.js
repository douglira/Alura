module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: [
    'angular',
    'html'
  ],
  extends: [
    'google',
    'angular',
    'plugin:angular/johnpapa'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    angular: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
