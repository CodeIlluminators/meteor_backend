const ignorePatterns = require('glob-all')
	.sync([...(process.env.ESLINT_IGNORE ? process.env.ESLINT_IGNORE.split(',') : []), '.eslintrc.js'], {
		ignore: '.eslintignore',
		cwd: __dirname,
	})
	.map((path) => path.replace(/\\/g, '/'));

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns,
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
