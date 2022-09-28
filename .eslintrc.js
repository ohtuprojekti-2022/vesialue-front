module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		"jest/globals": true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'settings': {
		'react': {
		  'version': 'detect'
		}
	},
	'plugins': [
		'react',
		'jest'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		"react/prop-types": 0
	}
}
