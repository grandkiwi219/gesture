import { isFirefox } from "src/isBrowser";
import { pipe_cm_event, pipe_cm_msg_event } from "src/pipe/event";
import { postMsg } from "../utils/utils";

function cmPreventDefault(event: PointerEvent) {
    if (event.isTrusted) {
        event.preventDefault();
        event.stopPropagation();
        sendAcknowledgeContextMenu();
    }
}

const pipe_msg: { [key: string]: PipeMsgEvent } = {
    ignore: {
        credit: pipe_cm_msg_event,
        event: pipe_cm_event.ignore
    },

    acknowledge: {
        credit: pipe_cm_msg_event,
        event: pipe_cm_event.acknowledge
    }
}

export function sendIgnoreContextMenu() {
    window.addEventListener('contextmenu', cmPreventDefault, true);

    const iframes = document.getElementsByTagName('iframe');

    for (const iframe of iframes) {
        postMsg(iframe.contentWindow, pipe_msg.ignore);
    }
}

export function sendAcknowledgeContextMenu() {
    window.removeEventListener('contextmenu', cmPreventDefault, true);

    const iframes = document.getElementsByTagName('iframe');

    for (const iframe of iframes) {
        postMsg(iframe.contentWindow, pipe_msg.acknowledge);
    }
}

let sent_ICM_QM = false;

export function sendToTopICM() {
    sent_ICM_QM = true;
    postMsg(window.top, pipe_msg.ignore);
}

export function sendToTopACM() {
    if (!sent_ICM_QM) return;
    sent_ICM_QM = false;
    postMsg(window.top, pipe_msg.acknowledge);
}
