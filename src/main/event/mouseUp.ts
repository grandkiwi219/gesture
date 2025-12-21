import { exitReset, exitRun } from "src/main/process";

export function mouseUp(event: MouseEvent) {
    if (event.button != 2) return;
    exitRun();
    exitReset();
}
