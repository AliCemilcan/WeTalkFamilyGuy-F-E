module.exports = {
	root: true,
	env: {
	  // this section will be used to determine which APIs are available to us
	  // (i.e are we running in a browser environment or a node.js env)
	  node: true,
	  browser: true
	},
	parserOptions: {
	//   parser: "babel-eslint",
	  // specifying a module sourcetype prevent eslint from marking import statements as errors
	//   sourceType: "module"\
	parser: "babel-eslint"
	},
	extends: [
	  // use the recommended rule set for both plain javascript and vue
	  "eslint:recommended",
	  "plugin:vue/recommended"
	],
	rules: {
		// we only want single quotes
		'quotes': ['error', 'single'],
		// we want to force semicolons
		// 'semi': ['error', 'never'],
		// we use 2 spaces to indent our code
		'indent': ['error', 2],
		"no-mixed-spaces-and-tabs": 0, // disable rule
	  // we should always disable console logs and debugging in production
	//   "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
	//   "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	}
  };
  