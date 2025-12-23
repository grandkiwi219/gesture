import logger from "src/main/utils/logger";

let ignore_context_menu = false;

export async function contextMenuEvent(event: PointerEvent) {
    if (!ignore_context_menu) {
       return;
    }

    event.preventDefault();
    event.stopPropagation();
}

export function ignoreContextMenu(data: boolean) {
    ignore_context_menu = data;
}
