// Reason to include rushstack below. According to https://www.npmjs.com/package/@vue/eslint-config-prettier ->  Before ESLint Flat Config becomes stable, in order to work around a known limitation in ESLint, we recommend you to use this package alongside @rushstack/eslint-patch, so that you don't have to install too many dependencies
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  browser: true,
  node: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    'vue/setup-compiler-macros': true
  }
}
