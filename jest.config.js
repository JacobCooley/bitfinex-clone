module.exports = {
	"testPathIgnorePatterns": [
		'<rootDir>/node_modules'
	],
	"moduleNameMapper": {
		"^component(.*)$": "<rootDir>/src/modules/common/components$1",
		"^home(.*)$": "<rootDir>/src/modules/home$1",
		"^utils(.*)$": "<rootDir>/src/utils$1",
		"^structures(.*)$": "<rootDir>/src/utils/structures$1",
		"^functions(.*)$": "<rootDir>/src/utils/functions$1",
		"^.+\\.(css|less|scss)$": "identity-obj-proxy"
	},
	"setupFiles": [
		"jest-prop-type-error"
	]
}