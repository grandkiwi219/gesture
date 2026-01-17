import { exitReset, exitRun } from "src/main/process";

export function mouseUp(event: MouseEvent | PipeCustomEvent, 
    {
        run = true,
        reset_options
    }: MouseExit = {}
) {
    if (!event.isTrusted || event.button != 2) return;
    if (run) exitRun();
    exitReset(reset_options);
}
