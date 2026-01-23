import consts from "src/main/consts";
import { variable } from "src/main/variable";
import { decideDir, measureDistanceSq } from "../utils/decider";
import { continueDrawing, showCommandDrawing, startDrawing } from "src/main/drawing";
import { exitReset, getCommandData } from "src/main/process";
import { sendIgnoreContextMenu } from "../context-menu";
import logger from "../utils/logger";
import { options } from "../enum";

export function mouseMove(event: MouseEvent | PipeCustomEvent,
    {
        ignoreContextMenu = sendIgnoreContextMenu,
        drawing_target = window,
        show_command = true,
        use_painting = options.painting.use,
        reset_options
    }
    : {
        ignoreContextMenu?: ((setIgnoreContextMenu: typeof sendIgnoreContextMenu) => void)
        drawing_target?: DrawingTarget,
        show_command?: boolean,
        use_painting?: boolean,
        reset_options?: ExitReset
    } = {}
) {
    if (!event.isTrusted || !variable.executing) return;

    if (event.buttons != 2) {
        exitReset(reset_options);
        return;
    }

    const distance = measureDistanceSq(event);

    if (!variable.starting) {
        if (distance > consts.start_range**2) {
            variable.starting = true;
            ignoreContextMenu(sendIgnoreContextMenu);
        }
        return;
    }

    if (!variable.drawing_store.target) {
        variable.drawing_store.target = drawing_target || window;
        startDrawing();
    }

    const current_pos: CoordinateObj = {
        x: event.clientX,
        y: event.clientY
    }

    if (use_painting) continueDrawing(current_pos);

    variable.last_pos.override(current_pos);

    if (distance <= consts.decide_range**2) return;

    const direction = decideDir(event);

    variable.changed_pos.override(variable.position);
    variable.position.override(current_pos);

    const is_new_dir = variable.directions.push(direction);

    if (show_command && is_new_dir) {
        const command_data = getCommandData();
        showCommandDrawing(command_data?.description, command_data?.gesturePainting);
    }

    return is_new_dir;
}
