import { messages, repeater_msg_event, script_msg_event } from "src/repeater/msg/message-type";

export function sendToRepeater(message: RepeaterMessage) {
    window.postMessage({ event: repeater_msg_event, detail: message } as RepeaterMessageWrapper, '*');
}

export function sendAcknowledgeContextMenu() {
    sendToRepeater(messages.acknowledge_context_menu);
}

export function sendIgnoreContextMenu() {
    sendToRepeater(messages.ignore_context_menu);
}


export function sendToScript(message: RepeaterMessage) {
    (window.top || window).postMessage({ event: script_msg_event, detail: message } as RepeaterMessageWrapper, '*');
}
