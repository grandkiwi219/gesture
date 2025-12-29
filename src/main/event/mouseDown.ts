import { variable } from "src/main/variable";
import { decidePos } from "src/main/utils/decider";
import { exitReset } from "src/main/process";
import { sendAcknowledgeContextMenu } from '../dispatch/index';
import { mouseMove } from "./mouseMove";

export function mouseDown(event: MouseEvent,
    {
        acknowledgeContextMenu = sendAcknowledgeContextMenu,
        use_mouse_move = true,
        reset_options
    }
    : {
        acknowledgeContextMenu?: Function,
        use_mouse_move?: boolean,
        reset_options?: ExitReset
    } = {}
) {
    if (event.button != 2) {
        exitReset(reset_options);
        return;
    }

    exitReset(reset_options);

    if (use_mouse_move) {
        if (variable.mouseMove)
            window.addEventListener('mousemove', variable.mouseMove, true);
        else
            throw new Error('mouseMove 이벤트 함수가 할당되지 않았습니다.');
    }

    acknowledgeContextMenu();

    variable.executing = true;
    decidePos(event);
    variable.initial_pos = {
        x: event.clientX,
        y: event.clientY
    }
}
