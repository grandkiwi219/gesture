import std from "page/std";
import { ActionDispatch, RefObject } from "react";

export function resizeNav(navShortState: RefObject<boolean>, setNavMenuState: ActionDispatch<any>) {
    const width = window.innerWidth;

    if (width >= std.size.nav.long) {
        if (navShortState.current)
            setNavMenuState({ input: std.state.nav.short });
        else
            setNavMenuState({ input: std.state.nav.long });
    }
    else if (width >= std.size.nav.short) {
        setNavMenuState({ input: std.state.nav.short });
    }
    else if (width >= std.size.nav.icon) {
        setNavMenuState({ input: std.state.nav.icon });
    }
    else {
        setNavMenuState({ input: std.state.nav.none });
    }
}
