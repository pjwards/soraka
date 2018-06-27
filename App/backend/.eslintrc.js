// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true
  },
  extends: ['airbnb-base'],
  plugins: [
    'import',
    'jest'
  ],
  rules: {
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2,
    'no-console': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'eol-last': 0,
    'class-methods-use-this': 0
  }
}
