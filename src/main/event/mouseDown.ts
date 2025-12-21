import { variable } from "src/main/variable";
import { decidePos } from "src/main/utils/decider";
import { exitReset, exitRun } from "src/main/process";

export function mouseDown(event: MouseEvent) {
    if (event.button != 2) {
        exitRun();
        exitReset();
        return;
    }

    variable.executing = true;
    decidePos(event);
    variable.initial_pos = {
        x: event.clientX,
        y: event.clientY
    }
}
