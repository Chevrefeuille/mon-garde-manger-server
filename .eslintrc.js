module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  },
  ignorePatterns: ['.eslintrc.js'],
};