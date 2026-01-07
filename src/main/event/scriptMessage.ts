import { scriptMessageRun } from "src/repeater/msg/message-script-events";
import { credits, script_msg_event } from "src/repeater/msg/message-type";
import { receiveMouseDown } from "./mouseDown";
import logger from "../utils/logger";

export function scriptMessage(event: MessageEvent) {

    if (event.data.event != script_msg_event) return;
    
    const data: RepeaterMessage | null = event.data.detail;

    if (
        !(data instanceof Object)
        || !data.credit
        || typeof data.script != 'string'
    ) return;

    switch (data.credit) {
        /* case credits.script_message:
            scriptMessageRun(data.script, data.data);
            break; */

        case credits.mousedown_messages:
            logger.log(data)
            if (data.data && typeof data.data.focus == 'boolean'
                && data.data.coord instanceof Object
                && typeof data.data.coord.x == 'number'
                && !Number.isNaN(data.data.coord.x)
                && typeof data.data.coord.y == 'number'
                && !Number.isNaN(data.data.coord.y)
            ) {
                receiveMouseDown(data.data.focus);
            }
            break;

        default:
            break;
    }

    return;
}
