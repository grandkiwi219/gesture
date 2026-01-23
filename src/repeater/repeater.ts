import { executeCustomScript } from "./msg/message-repeater-events";
import { credits, repeater_msg_event } from "./msg/message-type";
import logger from "src/main/utils/logger";

window.addEventListener(repeater_msg_event, event => {

    const data: RepeaterMessage = JSON.parse((event as CustomEvent).detail);

    if (
        typeof data != 'object'
        || !data.credit
        || typeof data.script != 'string'
    ) return;

    switch (data.credit) {
        case credits.custom_script_message:
            executeCustomScript(data.script);
            break;

        default:
            break;
    }

    return;
});
