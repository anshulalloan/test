module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"standard-with-typescript",
		"plugin:react/recommended",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:eslint-comments/recommended",
	],
	plugins: [
		"react-refresh",
		"react",
		"import",
		"jsx-a11y",
		"prettier",
	],
	ignorePatterns: [
		"build",
		".eslintrc.js",
		"*/**.css",
		"*/**.scss",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		// project: './tsconfig.json',
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
		react: {
			version: "detect",
		},
	},
	rules: {
		"brace-style": ["error", "1tbs"],
		"no-tabs": 0,
		semi: ["off"],
		"@typescript-eslint/semi": ["warn", "always"],
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"global-require": 0,
		"no-useless-catch": "warn",
		"no-unused-vars": "warn",
		"no-var": "warn",
		"eslint-comments/disable-enable-pair": "off",
		"eslint-comments/no-unlimited-disable": "off",
		"max-len": [
			"warn",
			{
				code: 120,
				tabWidth: 2,
				comments: 150,
				ignoreComments: false,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-unsafe-argument": "warn",
		"@typescript-eslint/no-confusing-void-expression":
			"warn",
		"no-unused-expressions": "off",
		"import/prefer-default-export": "off",
		"import/order": [
			"warn",
			{
				groups: [
					"builtin",
					"internal",
					"external",
					"object",
					"type",
					"parent",
					"sibling",
					"index",
				],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				"newlines-between": "always",
				pathGroupsExcludedImportTypes: ["builtin"],
			},
		],
		"import/first": 2,
		"import/no-namespace": 1,
		"react/prop-types": 0,
		"react/no-unescaped-entities": "off",
		"import/extensions": "off",
		"import/no-useless-path-segments": [
			"error",
			{
				noUselessIndex: true,
			},
		],
		"import/no-deprecated": 1,
		"import/no-commonjs": ["error"],
		"import/no-unassigned-import": [
			"error",
			{ allow: ["**/*.css", "**/*.scss"] },
		],
		"import/no-duplicates": ["error"],
		"import/no-cycle": ["warn"],
		eqeqeq: ["error", "always"],
		"max-params": ["error", 4],
		"no-console": ["warn", { allow: ["warn", "error"] }],
		"no-useless-return": ["error"],
		"no-empty": ["warn"],
		"spaced-comment": ["error", "always"],
		yoda: ["error", "never"],
		"jsx-a11y/href-no-hash": ["off"],
		"react/jsx-filename-extension": [
			"warn",
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
		"dot-notation": "off",
		"no-use-before-define": "off",
		"consistent-return": "off",
		"jsx-a11y/media-has-caption": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"react/jsx-props-no-spreading": "off",
		"react/require-default-props": "off",
		"@typescript-eslint/return-await": ["error"],
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "default",
				format: [
					"camelCase",
					"UPPER_CASE",
					"PascalCase",
					"snake_case",
				],
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
			},
			{
				selector: ["typeLike"],
				format: ["PascalCase"],
			},
			{
				selector: ["variable"],
				modifiers: ["const", "exported"],
				format: [
					"camelCase",
					"UPPER_CASE",
					"PascalCase",
					"snake_case",
				],
			},
			{
				selector: [
					"classProperty",
					"objectLiteralProperty",
					"typeProperty",
					"classMethod",
					"objectLiteralMethod",
					"typeMethod",
					"accessor",
					"enumMember",
				],
				format: null,
				modifiers: ["requiresQuotes"],
			},
			{
				selector: ["typeAlias"],
				prefix: ["T"],
				format: ["PascalCase"],
			},
			{
				selector: ["interface"],
				prefix: ["I"],
				format: ["PascalCase"],
			},
			{
				selector: ["enum"],
				suffix: ["Enum"],
				format: ["PascalCase"],
			},
			{
				selector: ["enumMember"],
				format: null,
			},
			{
				selector: "variable",
				modifiers: ["destructured"],
				format: null,
			},
		],
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/interface-name-prefix": 0,
		"@typescript-eslint/array-type": [
			"error",
			{ default: "generic", readonly: "generic" },
		],
		"@typescript-eslint/consistent-generic-constructors": [
			"error",
		],
		"@typescript-eslint/consistent-indexed-object-style": [
			"error",
		],
		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"type",
		],
		"@typescript-eslint/ban-types": ["off"],
		"@typescript-eslint/method-signature-style": ["error"],
		"@typescript-eslint/no-confusing-non-null-assertion": [
			"warn",
		],
		"@typescript-eslint/no-duplicate-enum-values": [
			"error",
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-floating-promises": [
			"warn",
			{ ignoreIIFE: true, ignoreVoid: true },
		],
		"@typescript-eslint/no-for-in-array": ["error"],
		"@typescript-eslint/no-non-null-asserted-optional-chain":
			["error"],
		"@typescript-eslint/no-unnecessary-condition": ["warn"],
		"@typescript-eslint/non-nullable-type-assertion-style":
			["off"],
		"@typescript-eslint/comma-dangle": ["off"],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: false,
			},
		],
		"multiline-ternary": "off",
		"@typescript-eslint/space-before-function-paren": [
			"off",
		],
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
	},
};
