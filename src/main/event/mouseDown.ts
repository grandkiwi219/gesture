import { variable } from "src/main/variable";
import { exitReset } from "src/main/process";
import { mouseMove } from "./mouseMove";
import { Coordinate } from "../frame/Coordinate";

export function mouseDown(event: MouseEvent | PipeCustomEvent,
    {
        use_mouse_move = true,
        reset_options
    }
    : {
        use_mouse_move?: boolean,
        reset_options?: ExitReset
    } = {}
) {
    if (!event.isTrusted) return;

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

    variable.executing = true;

    const down_pos: CoordinateObj = {
        x: event.clientX,
        y: event.clientY
    }

    variable.position.override(down_pos);
    variable.initial_pos.override(down_pos);
}
