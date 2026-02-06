import { variable } from "src/main/variable";
import { pipe_cm_event, pipe_cm_msg_event, pipe_event, pipe_msg_event } from "./event";
import consts from "src/main/consts";
import { measureDistanceSq } from "src/main/utils/decider";
import { startDrawing } from "src/main/drawing";
import { exitReset } from "src/main/process";
import { mouseDown, mouseUp } from "src/main/event";
import { sendAcknowledgeContextMenu, sendIgnoreContextMenu, sendToTopACM, sendToTopICM } from "src/main/pipeMessages";
import { getMsg, postMsg } from "src/main/utils/utils";
import logger from "src/main/utils/logger";

void function main() {

    window.addEventListener('message', (event: MessageEvent) => {
        
        const data = getMsg(event.data);

        if (!data) return;

        switch (data.credit) {
            case pipe_msg_event: {
                let iframe = undefined;

                for (const el of document.getElementsByTagName('iframe')) {
                    if (el.contentWindow === event.source) {
                        iframe = el;
                        break;
                    }
                }

                if (!iframe) return;

                const clientRect = iframe.getBoundingClientRect();

                const cleanup_detail: PipeCustomEvent = {
                    ...data.detail,
                    clientX: data.detail.clientX + clientRect.x,
                    clientY: data.detail.clientY + clientRect.y
                };

                window.parent.postMessage(
                    {
                        credit: pipe_msg_event,
                        event: data.event,
                        detail: cleanup_detail
                    } as PipeMsgEvent,
                '*');
                return;
            }

            case pipe_cm_msg_event: {
                switch (data.event) {
                    case pipe_cm_event.ignore: {
                        sendIgnoreContextMenu();
                        return;
                    }

                    case pipe_cm_event.acknowledge: {
                        sendAcknowledgeContextMenu();
                        return;
                    }
                    
                    default: return;
                }
            }

            default: return;
        }
    });

    const reset_options: ExitReset = {
        execution: sendToTopACM
    };

    variable.mouseMove = pipeMouseMove;

    window.addEventListener('mousedown', event => {
        if (!event.isTrusted) return;

        sendData(event, pipe_event.mousedown);

        mouseDown(event, { reset_options });
    }, true);

    window.addEventListener('mouseup', event => {
        if (!event.isTrusted) return;

        sendData(event, pipe_event.mouseup);

        mouseUp(event, { run: false, reset_options });
    }, true);

    function pipeMouseMove(event: MouseEvent) {
        if (!event.isTrusted) return;
        
        sendData(event, pipe_event.mousemove);

        accessStarting(event, sendToTopICM);
    }

    function accessStarting(event: MouseEvent, callback: (() => void)) {
        if (!variable.executing) return;

        if (event.buttons != 2) {
            exitReset(reset_options);
            return;
        }

        const distance = measureDistanceSq(event);

        if (!variable.starting) {
            if (distance > consts.start_range**2) {

                variable.starting = true;

                variable.drawing_store.target = window;

                startDrawing();

                callback();
            }
            else {
                variable.position.set(event.clientX, event.clientY);
            }
        }
    }

    function sendData(event: MouseEvent, event_name: string) {
        postMsg(window.parent, {
            credit: pipe_msg_event,
            event: event_name,
            detail: {
                isTrusted: event.isTrusted,
                button: event.button,
                buttons: event.buttons,
                clientX: event.clientX,
                clientY: event.clientY
            }
        });
    };
}();
