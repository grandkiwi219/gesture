import { messages, repeater_msg_event } from "src/repeater/msg/message-type";

export function sendAcknowledgeContextMenu() {
    window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.acknowledge_context_menu) }));
}

export function sendIgnoreContextMenu() {
    window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(messages.ignore_context_menu) }));
}