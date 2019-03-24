module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
  ],
  'parser': 'babel-eslint',
  "plugins": [
    "prettier"
  ],
  'env': {
    'jest': true,
  },
  'rules': {
    "prettier/prettier": ["error", {
        "trailingComma": "all",
        "singleQuote": true
      }],
    "no-console": ["error", { allow: ["info", "warn",'debug'] }],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off'
  },
  'globals': {
    "fetch": false
  }
}