import std from "../std";

export function navMenuReducer(state: any, { type, input }: { type?: 'execute' | null, input?: string }) {
	if (type == 'execute') {
		switch(state) {
			case std.state.nav.short:
				localStorage.setItem(std.key.nav, std.state.nav.long);
				return std.state.nav.long;

			case std.state.nav.icon:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon_open;

			case std.state.nav.icon_open:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon;

			case std.state.nav.none:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none_open;

			case std.state.nav.none_open:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none;

			default:
				localStorage.setItem(std.key.nav, std.state.nav.short);
				return std.state.nav.short;
		}
	}
	else {
		switch (input) {
			case std.state.nav.short:
				localStorage.setItem(std.key.nav, std.state.nav.short);
				return std.state.nav.short;

			case std.state.nav.icon:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon;

			case std.state.nav.icon_open:
				localStorage.setItem(std.key.nav, std.state.nav.icon);
				return std.state.nav.icon_open;

			case std.state.nav.none:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none;

			case std.state.nav.none_open:
				localStorage.setItem(std.key.nav, std.state.nav.none);
				return std.state.nav.none_open;

			default:
				localStorage.removeItem(std.key.nav);
				return std.state.nav.long;

		}
	}
}