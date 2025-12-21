let ignore_context_menu = false;

export function contextMenuEvent(event: PointerEvent) {
    if (!ignore_context_menu) return;

    event.preventDefault();
    event.stopPropagation();
}

export function ignoreContextMenu() {
    ignore_context_menu = true;
}

export function acknowledgeContextMenu() {
    ignore_context_menu = false;
}
