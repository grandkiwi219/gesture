import { variable } from "src/variable";
import { decidePos } from "src/utils/utils";
import { exit } from "src/exit";

export function mouseDown(event: MouseEvent) {
    if (event.button != 2) {
        exit();
        return;
    }

    variable.executing = true;
    decidePos(event);
}
