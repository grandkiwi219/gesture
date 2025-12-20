const constants = {
	key: {
		theme: 'theme',
	},
};

enum Theme {
	Dark = 'dark',
	Light = 'light',
}

export default {
	...constants,
	Theme: Theme,
};
