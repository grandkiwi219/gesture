import { variable } from "src/main/variable";
import { decidePos } from "src/main/utils/decider";
import { exitReset } from "src/main/process";
import { messages, repeater_msg_event } from "src/msg/message-type";
import { mouseMove } from "./mouseMove";

export function mouseDown(event: MouseEvent) {
    if (event.button != 2) {
        exitReset();
        return;
    }

    exitReset();

    window.addEventListener('mousemove', mouseMove, true);

    window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: messages.acknowledge_context_menu }));

    variable.executing = true;
    decidePos(event);
    variable.initial_pos = {
        x: event.clientX,
        y: event.clientY
    }
}
