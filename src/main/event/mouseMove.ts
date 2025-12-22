import consts from "src/main/consts";
import { messages, repeater_msg_event } from "../../msg/message-type";
import { variable } from "src/main/variable";
import { decidePos, decideDir, measureDistanceSq } from "../utils/decider";
import { continueDrawing, showCommandDrawing, startDrawing } from "src/main/drawing";
import { getCommandData } from "src/main/process";
import logger from "../utils/logger";

export function mouseMove(event: MouseEvent,
    {
        drawing_target = window,
        show_command = true
    }
    : {
        drawing_target?: Element | Window,
        show_command?: boolean
    }
    = {}
) {
    if (!variable.executing) return;

    const distance = measureDistanceSq(event);

    if (!variable.starting) {
        if (distance > consts.start_range**2) {
            variable.starting = true;
            window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.ignore_context_menu) }));
        }
        return;
    }

    if (!(drawing_target instanceof Element) && !(drawing_target instanceof Window))
        drawing_target = window;

    if (!variable.drawing_store.target) {
        variable.drawing_store.target = drawing_target;
        startDrawing();
    }

    continueDrawing({ x: event.clientX, y: event.clientY });

    variable.last_pos = {
        x: event.clientX,
        y: event.clientY
    }

    if (distance <= consts.decide_range**2) return;

    const direction = decideDir(event);
    decidePos(event);

    if (!show_command) return;

    const is_new_dir = variable.directions.push(direction);
    
    if (!is_new_dir) return;

    const data = getCommandData();

    showCommandDrawing(data?.description);
}
