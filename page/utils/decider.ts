import std from "page/std";
import { ActionDispatch, RefObject } from "react";
import { isUserScriptsAvailable } from "service/utils";
import { isFirefox } from "src/isFirefox";

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

export const decideWarnState = () => !isFirefox && !isUserScriptsAvailable();

export class decideWarnEffect {
    private warnState = false;
    private setWarnState = (value: React.SetStateAction<boolean>) => {};

    constructor(warnState: boolean, setWarnState: (value: React.SetStateAction<boolean>) => void) {
        this.warnState = warnState;
        this.setWarnState = setWarnState;
    }

    execute() {
        if (isFirefox) return;

        const vcEvent = () => {
            const currentWarnState = decideWarnState();

            if (document.visibilityState === "visible" && this.warnState != currentWarnState) {
                this.setWarnState(currentWarnState);
            }
        }

        window.addEventListener("visibilitychange", vcEvent);
        window.addEventListener("focus", vcEvent);

        return () => {
            window.removeEventListener("visibilitychange", vcEvent);
            window.removeEventListener("focus", vcEvent);
        }
    }
}
