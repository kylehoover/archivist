module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "rules": {
        "arrow-body-style": "error",
        "arrow-parens": ["error", "as-needed"],
        "camelcase": "error",
        "comma-dangle": ["error", "always-multiline"],
        "complexity": "off",
        "constructor-super": "error",
        "curly": "error",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": ["error", "smart"],
        "guard-for-in": "error",
        "id-blacklist": "error",
        "id-match": "error",
        "max-classes-per-file": ["error", 1],
        "max-len": ["error", { "code": 120 }],
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "off",
        "no-debugger": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-shadow": ["error", { "hoist": "all" }],
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-unused-vars": "off",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "quote-props": ["error", "consistent-as-needed"],
        "radix": "error",
        "semi": "off",
        "sort-imports": ["error", { "ignoreDeclarationSort": true }],
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "asyncArrow": "always",
                "named": "never"
            }
        ],
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/array-type": ["error", { "default": "array" }],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "constructors": "no-public"
                }
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-empty-interface": ["error", { "allowSingleExtends": true }],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/quotes": ["error", "single"],
        "@typescript-eslint/semi": ["error", "never"],
        "@typescript-eslint/unified-signatures": "error",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "import-spacing": true,
                    "jsdoc-format": true,
                    "no-reference-import": true,
                    "object-literal-sort-keys": true,
                    "one-line": [
                        true,
                        "check-catch",
                        "check-else",
                        "check-finally",
                        "check-open-brace",
                        "check-whitespace"
                    ],
                    "typedef": [
                        true,
                        "call-signature"
                    ],
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-type",
                        "check-typecast"
                    ]
                }
            }
        ]
    }
};
