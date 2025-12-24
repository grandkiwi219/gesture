const constants = {
	key: {
		theme: 'theme',
		nav: 'nav'
	},

	state: {
		nav: {
			long: 'long',
			short: 'short',
			none: 'none',
			none_open: 'none open'
		}
	}
};

enum Theme {
	Dark = 'dark',
	Light = 'light',
}

const icon_size = 20;

export default {
	...constants,
	Theme: Theme,
	icon_size,
};
