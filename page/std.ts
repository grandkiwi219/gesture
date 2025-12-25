const key = {
	theme: 'theme',
	nav: 'nav'
}

const state = {
	nav: {
		long: 'long',
		short: 'short',

		icon: 'icon',
		icon_open: 'icon open',

		none: 'none',
		none_open: 'none open'
	}
}

const size = {
	icon: 20,

	nav: {
		long: 1320,
		short: 1000,
		icon: 700,
	},

	display: 1000
}

enum Theme {
	Dark = 'dark',
	Light = 'light',
}


export default {
	key,
	state,
	size,
	Theme: Theme,
};
