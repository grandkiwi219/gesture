import { exitReset, exitRun } from "src/main/process";
import { messages, repeater_msg_event } from "src/msg/message-type";

export function mouseUp(event: MouseEvent, { run = true }: { run?: boolean } = {}) {
    if (event.button != 2) return;
    if (run) exitRun();
    exitReset();
}
