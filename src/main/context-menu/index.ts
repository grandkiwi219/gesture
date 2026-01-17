import { gen_cm_event, gen_cm_msg_event } from "src/pipe/event";

let cm_prevent = false;

function cmPreventDefault(event: PointerEvent) {
    if (event.isTrusted) {
        event.preventDefault();
        event.stopPropagation();
        sendAcknowledgeContextMenu();
    }
}

export function sendIgnoreContextMenu() {
    if (cm_prevent) return;

    cm_prevent = true;
    window.addEventListener('contextmenu', cmPreventDefault, true);

    const iframes = document.getElementsByTagName('iframe');

    const msg: PipeMsgEvent = {
        credit: gen_cm_msg_event,
        event: gen_cm_event.ignore
    }

    for (const iframe of iframes) {

        iframe.contentWindow?.postMessage(msg, '*');
    }

    if (window.top != window) window.parent.postMessage(msg, '*');
}

export function sendAcknowledgeContextMenu() {
    if (!cm_prevent) return;

    cm_prevent = false;
    window.removeEventListener('contextmenu', cmPreventDefault, true);
    
    const iframes = document.getElementsByTagName('iframe');

    const msg: PipeMsgEvent = {
        credit: gen_cm_msg_event,
        event: gen_cm_event.acknowledge
    }

    for (const iframe of iframes) {

        iframe.contentWindow?.postMessage(msg, '*');
    }

    if (window.top != window) window.parent.postMessage(msg, '*');
}
