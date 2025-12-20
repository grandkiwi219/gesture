import consts from "src/consts";
import { variable } from "src/variable";
import { decidePos, decideDir, measureDistanceSq } from "../utils/utils";

export function mouseMove(event: MouseEvent) {
    if (!variable.executing) return;

    const distance = measureDistanceSq(event);

    if (!variable.starting) {
        if (distance > consts.start_range**2)
            variable.starting = true;
        return;
    }

    if (distance <= consts.decide_range**2) return;

    const direction = decideDir(event);
    decidePos(event);

    const is_new_dir = variable.directions.push(direction);
}
