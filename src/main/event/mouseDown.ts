import { variable } from "src/main/variable";
import { decidePos } from "src/main/utils/decider";
import { exitReset, exitRun } from "src/main/process";
import { messages, repeater_msg_event } from "src/msg/message-type";

export function mouseDown(event: MouseEvent, { run = true }: { run?: boolean } = {}) {
    if (event.button != 2) {
        if (run) exitRun();
        exitReset();
        return;
    }

    window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.acknowledge_context_menu) }));

    variable.executing = true;
    decidePos(event);
    variable.initial_pos = {
        x: event.clientX,
        y: event.clientY
    }
}
