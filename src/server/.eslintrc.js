module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', '@typescript-eslint', 'prettier'],
  globals: {
    JSX: 'readonly',
  },
  rules: {
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'global-require': 0,
    'prettier/prettier': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': 0,
    'no-empty-pattern': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-restricted-globals': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^@'], ['^'], ['^\\.']],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: '*', next: 'break' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: 'const', next: 'expression' },
      { blankLine: 'always', prev: 'expression', next: 'expression' },
    ],
  },
};
