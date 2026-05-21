import { pipe_cm_event, pipe_cm_msg_event, pipe_event, pipe_msg_event } from "src/pipe/event";
import { variable } from "../variable";
import { mouseDown } from "./mouseDown";
import { mouseUp } from "./mouseUp";
import { sendAcknowledgeContextMenu, sendIgnoreContextMenu } from "../pipeMessages";
import { getMsg } from "../utils/utils";
import logger from "../utils/logger";
import { isFirefox } from "src/isBrowser";

let cached_WTIE: WindowTopIndependentElement | undefined = undefined;

export function pipeMessage(event: MessageEvent) {
    
    const data = getMsg(event.data);
    
    if (!data) return;

    switch (data.credit) {
        case pipe_msg_event: {

            let WTIE: WindowTopIndependentElement | undefined = cached_WTIE?.contentWindow === event.source
                ? cached_WTIE
                : undefined;

            findWTIE: 
            if (!WTIE) {
                for (const el of document.getElementsByTagName('iframe')) {
                    if (el.contentWindow === event.source) {
                        WTIE = cached_WTIE = el;
                        break findWTIE;
                    }
                }

                for (const el of document.getElementsByTagName('frame')) {
                    if (el.contentWindow === event.source) {
                        WTIE = cached_WTIE = el;
                        break findWTIE;
                    }
                }

                cached_WTIE = undefined;
                return;
            }

            const clientRect = WTIE.getBoundingClientRect();

            const cleanup_detail: PipeCustomEvent = {
                ...data.detail,
                clientX: data.detail.clientX + clientRect.x,
                clientY: data.detail.clientY + clientRect.y
            };

            switch (data.event) {
                case pipe_event.mousemove:
                    if (variable.mouseMove) (variable.mouseMove as (ev: PipeCustomEvent) => void)(cleanup_detail);
                    return;

                case pipe_event.mousedown:
                    mouseDown(cleanup_detail, { use_mouse_move: isFirefox });
                    return;

                case pipe_event.mouseup:
                    mouseUp(cleanup_detail);                
                    return;

                default: return;
            }
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
}
