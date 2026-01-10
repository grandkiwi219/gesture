import consts from "src/main/consts";
import { variable } from "src/main/variable";
import { decidePos, decideDir, measureDistanceSq } from "../utils/decider";
import { continueDrawing, showCommandDrawing, startDrawing } from "src/main/drawing";
import { exitReset, getCommandData } from "src/main/process";
import { sendIgnoreContextMenu } from "../context-menu";
import logger from "../utils/logger";

export function mouseMove(event: MouseEvent,
    {
        ignoreContextMenu = sendIgnoreContextMenu,
        drawing_target = window,
        show_command = true,
        reset_options
    }
    : {
        ignoreContextMenu?: Function
        drawing_target?: Element | Window | null,
        show_command?: boolean,
        reset_options?: ExitReset
    } = {}
) {
    if (!variable.executing) return;

    if (event.buttons != 2) {
        exitReset(reset_options);
        return;
    }

    const distance = measureDistanceSq(event);

    if (!variable.starting) {
        if (distance > consts.start_range**2) {
            variable.starting = true;
            ignoreContextMenu();
        }
        return;
    }

    if (!variable.drawing_store.target) {
        variable.drawing_store.target = drawing_target || window;
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

    const is_new_dir = variable.directions.push(direction);

    if (show_command && is_new_dir) {
        const command_data = getCommandData();
        showCommandDrawing(command_data?.description, command_data?.gesturePainting);
    }

    return is_new_dir;
}
