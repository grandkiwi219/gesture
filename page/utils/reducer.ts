import { RefObject } from "react";
import std from "../std";

export function navMenuReducer(navShortState: RefObject<boolean>) {
	return function(state: any, { type, input }: { type?: 'execute' | null, input?: string }) {
			if (type == 'execute') {
				switch(state) {
					case std.state.nav.short:
						if (window.innerWidth >= std.size.nav.long) {
							navShortState.current = false;
							localStorage.setItem(std.key.nav_short, JSON.stringify(navShortState.current));
						}
						return std.state.nav.long;
	
					case std.state.nav.icon:
						return std.state.nav.icon_open;
	
					case std.state.nav.icon_open:
						return std.state.nav.icon;
	
					case std.state.nav.none:
						return std.state.nav.none_open;
	
					case std.state.nav.none_open:
						return std.state.nav.none;
	
					default:
						if (window.innerWidth >= std.size.nav.long) {
							navShortState.current = true;
							localStorage.setItem(std.key.nav_short, JSON.stringify(navShortState.current));
						}
						return std.state.nav.short;
				}
			}
			else {
				switch (input) {
					case std.state.nav.short:
						return std.state.nav.short;
	
					case std.state.nav.icon:
						return std.state.nav.icon;
	
					case std.state.nav.icon_open:
						return std.state.nav.icon_open;
	
					case std.state.nav.none:
						return std.state.nav.none;
	
					case std.state.nav.none_open:
						return std.state.nav.none_open;
	
					default:
						return std.state.nav.long;
	
				}
			}
	}
}