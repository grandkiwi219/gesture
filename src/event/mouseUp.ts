import { exit } from "src/exit";

export function mouseUp(event: MouseEvent) {
    if (event.button != 2) return;
    exit();
}
