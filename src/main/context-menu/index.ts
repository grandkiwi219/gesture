function preventDefault(event: PointerEvent) {
    if (event.isTrusted) {
        event.preventDefault();
        event.stopPropagation();
    }
}

export function sendAcknowledgeContextMenu() {
    // window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.acknowledge_context_menu) }));
    window.removeEventListener('contextmenu', preventDefault, true);
}

export function sendIgnoreContextMenu() {
    // window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.ignore_context_menu) }));
    window.addEventListener('contextmenu', preventDefault, true);
}
