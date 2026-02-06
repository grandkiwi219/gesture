import { pipe_cm_event, pipe_cm_msg_event } from "src/pipe/event";
import { postMsg } from "../utils/utils";

/* context menu */

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

// 미완성 부분

/* check */

const pipes_cache = new WeakMap<MessageEventSource, HTMLIFrameElement>();

export function cachePipe(source: MessageEventSource | null) {

}

export function checkPipes(source: MessageEventSource | null) {
    if (!source) return undefined;

    if (pipes_cache.has(source)) {
        const cached = pipes_cache.get(source);
        if (cached?.isConnected) return cached;
    }

    let iframe: HTMLIFrameElement | undefined = undefined;

    for (const el of document.getElementsByTagName('iframe')) {
        if (el.contentWindow === source) {
            iframe = el;
            break;
        }
    }

    if (!iframe) {
        void function $(root: Document | ShadowRoot) {
            if (iframe) return;

            let iframes: HTMLIFrameElement[] = root == document ? [] : Array.from(root.querySelectorAll('iframe'));

            for (const el of iframes) {
                if (el.contentWindow === source) {
                    iframe = el;
                    return;
                }
            }

            const allElements = root.querySelectorAll('*');
            for (const el of allElements) {
                if (iframe) return;

                if (el.shadowRoot) {
                    $(el.shadowRoot);
                }
            }
        }(document);
    }

    if (iframe) {
        pipes_cache.set(source, iframe);
    }

    return iframe;
}

export function getAllIframes(root: Document | ShadowRoot = document): HTMLIFrameElement[] {
    let iframes: HTMLIFrameElement[] = Array.from(root.querySelectorAll('iframe'));

    const allElements = root.querySelectorAll('*');
    for (const el of allElements) {
        if (el.shadowRoot) {
            iframes = iframes.concat(getAllIframes(el.shadowRoot));
        }
    }

    return iframes;
}
