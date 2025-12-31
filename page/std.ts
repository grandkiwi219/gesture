const key = {
	theme: 'theme',
	nav: 'nav',
	nav_short: 'nav_short'
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

const event = {
	command_loaded: 'command_loaded',
	command_added: 'command_added'
}

export enum Theme {
	Dark = 'dark',
	Light = 'light',
}


export default {
	key,
	state,
	size,
	event,
	Theme: Theme,
};
