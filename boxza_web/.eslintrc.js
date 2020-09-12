module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 'off',
    'no-unused-expressions': 'off',
    'new-cap': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'dot-notation': "off",
    'indent': "off",
    "quotes": [0, "double"],
    "arrow-body-style": "off",
    "class-methods-use-this": "off",
    "default-case": "off",
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-return-assign": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "yoda": "off",
    "no-unused-vars": "off",
    "dot-notation": "off",
    "linebreak-style": "off",
    "semi": "off",
    "no-console": "off",
    "prefer-template": "off",
    "prefer-arrow-callback": "off",
    "no-restricted-globals": "off",
    "func-names": "off",
    "no-var": "off",
    "radix": "off",
    "vue/attributes-order": "off",
    "vue/attribute-hyphenation": "off",
    "object-shorthand": "off",
    "quote-props": ["error", "consistent"],
    "vue/max-attributes-per-line": "off",
    "import/prefer-default-export": "off",
    "space-before-function-paren": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/name-property-casing": "off",
    "no-lonely-if": "off",
    "comma-dangle": ["error", "never"],
    "import/extensions": ["error", "never"],
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "./stories$",
          "/storiesOf",
          "^native-base",
          "^reation-build",
          "^~",
          "."
        ]
      }
    ],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "^~",
          ".",
          "^@"
        ]
      }
    ],
    "max-len": ["error", { "code": 5000, "ignoreComments": true }],
    // 'no-debugger': 'error'
  }
}
