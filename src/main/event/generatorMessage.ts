import { gen_cm_event, gen_cm_msg_event, gen_event, gen_msg_event } from "src/generator/event";
import { variable } from "../variable";
import { mouseDown } from "./mouseDown";
import { mouseUp } from "./mouseUp";
import { IoMdReturnRight } from "react-icons/io";
import { sendAcknowledgeContextMenu, sendIgnoreContextMenu } from "../context-menu";

export function generatorMessage(event: MessageEvent) {
    
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

            switch (data.event) {
                case gen_event.mousemove:
                    if (variable.mouseMove) (variable.mouseMove as (ev: GesCustomEvent) => void)(cleanup_detail);
                    return;

                case gen_event.mousedown:
                    mouseDown(cleanup_detail);
                    return;

                case gen_event.mouseup:
                    mouseUp(cleanup_detail);                
                    return;

                default: return;
            }
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
}
