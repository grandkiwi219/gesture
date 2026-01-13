import { exitReset, exitRun } from "src/main/process";

export function mouseUp(event: MouseEvent | GesCustomEvent, 
    {
        run = true,
        reset_options
    }: MouseExit = {}
) {
    if (event.button != 2) return;
    if (run) exitRun();
    exitReset(reset_options);
}
