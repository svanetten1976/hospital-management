const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
)

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/static-property-placement': 0,
    'import/no-named-as-default': 0,
    'react/destructuring-assignment': 0,
    'arrow-body-style': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/prop-types': 0,
    'sort-keys': 0,
    'no-prototype-builtins': 0,
    'jsx-a11y/href-no-hash': [0],
    'comma-dangle': 0,
    'no-labels': 0,
    'guard-for-in': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-unused-labels': 0,
    'no-restricted-syntax': 0,
    'no-console': 0,
    'no-sequences': 0,
    'no-nested-ternary': 0,
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true
      }
    ],
    'no-unused-vars': [
      1,
      {
        vars: 'local',
        args: 'none'
      }
    ],
    'no-constant-condition': 0,
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true
      }
    ],
    'no-return-assign': 0,
    'no-underscore-dangle': 0,
    'no-confusing-arrow': 0,
    'arrow-parens': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 1,
    'react/jsx-no-bind': 0,
    'react/no-string-refs': 1,
    'react/no-unused-prop-types': 1,
    'no-extra-boolean-cast': 1,
    'prefer-const': 1,
    'react/sort-comp': 1,
    'react/prefer-stateless-function': 1,
    'class-methods-use-this': 1,
    'no-plusplus': [
      1,
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-bitwise': 0,
    'spaced-comment': 1,
    'no-shadow': 1,
    'no-debugger': 0,
    'no-undef': 2,
    'function-paren-newline': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'react/default-props-match-prop-types': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'react/no-find-dom-node': 1,
    'react/no-unused-state': 1,
    'react/require-default-props': 1,
    'no-restricted-globals': 1,
    'jsx-a11y/no-noninteractive-tabindex': 1,
    'jsx-a11y/label-has-for': 1,
    'jsx-a11y/heading-has-content': 0,
    'react/jsx-props-no-spreading': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js'
      }
    }
  }
}
