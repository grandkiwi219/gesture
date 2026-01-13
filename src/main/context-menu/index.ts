function cmPreventDefault(event: PointerEvent) {
    if (event.isTrusted) {
        event.preventDefault();
        event.stopPropagation();
        sendAcknowledgeContextMenu();
    }
}

export function sendIgnoreContextMenu() {
    window.addEventListener('contextmenu', cmPreventDefault, true);
}

export function sendAcknowledgeContextMenu() {
    window.removeEventListener('contextmenu', cmPreventDefault, true);
}
