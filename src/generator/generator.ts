import { variable } from "src/main/variable";
import { gen_cm_event, gen_cm_msg_event, gen_event, gen_msg_event } from "./event";
import consts from "src/main/consts";
import { measureDistanceSq } from "src/main/utils/decider";
import { startDrawing } from "src/main/drawing";
import { exitReset } from "src/main/process";
import { mouseDown, mouseUp } from "src/main/event";
import { sendAcknowledgeContextMenu, sendIgnoreContextMenu } from "src/main/context-menu";

void function main() {

    window.addEventListener('message', (event: MessageEvent) => {
        
        const data = event.data;

        if (!(data instanceof Object)) return;

        switch (data.credit) {
            case gen_msg_event: {
                let iframe = undefined;

                for (const el of document.getElementsByTagName('iframe')) {
                    if (el.contentWindow === event.source) {
                        iframe = el;
                        break;
                    }
                }

                if (!iframe) return;

                const clientRect = iframe.getBoundingClientRect();

                const cleanup_detail: GesCustomEvent = {
                    ...data.detail,
                    clientX: data.detail.clientX + clientRect.x,
                    clientY: data.detail.clientY + clientRect.y
                };

                window.parent.postMessage(
                    {
                        credit: gen_msg_event,
                        event: data.event,
                        detail: cleanup_detail
                    } as GenMsgEvent,
                '*');
                return;
            }

            case gen_cm_msg_event: {
                switch (data.event) {
                    case gen_cm_event.ignore: {
                        sendIgnoreContextMenu();
                        return;
                    }

                    case gen_cm_event.acknowledge: {
                        sendAcknowledgeContextMenu();
                        return;
                    }
                    
                    default: return;
                }
            }

            default: return;
        }
    });

    variable.mouseMove = genMouseMove;

    window.addEventListener('mousedown', event => {
        sendData(event, gen_event.mousedown);

        if (event.button != 2) {
            exitReset();
        }

        mouseDown(event);
    }, true);

    window.addEventListener('mouseup', event => {
        sendData(event, gen_event.mouseup);

        if (event.button != 2) return;

        mouseUp(event);
    }, true);

    function genMouseMove(event: MouseEvent) {
        if (event.buttons != 2) {
            exitReset();
        }

        const distance = measureDistanceSq(event);
        
        if (!variable.starting) {
            if (distance > consts.start_range**2) {

                variable.starting = true;

                variable.drawing_store.target = window;

                startDrawing();
            }
            else {
                variable.position.set(event.clientX, event.clientY);
            }
        }

        sendData(event, gen_event.mousemove);
    }

    function sendData(event: MouseEvent, event_name: string) {
        const data = {
            credit: gen_msg_event,
            event: event_name,
            detail: {
                isTrusted: event.isTrusted,
                button: event.button,
                buttons: event.buttons,
                clientX: event.clientX,
                clientY: event.clientY
            }
        } as GenMsgEvent

        window.parent.postMessage(data, '*');
    };
}();
