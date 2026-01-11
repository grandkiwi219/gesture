function cmPreventDefault(event: PointerEvent) {
    if (event.isTrusted) {
        event.preventDefault();
        event.stopPropagation();
        window.removeEventListener('contextmenu', cmPreventDefault, true);
    }
}

export function sendIgnoreContextMenu() {
    window.addEventListener('contextmenu', cmPreventDefault, true);
}
