import { contextMenuEvent, ignoreContextMenu } from "../msg/message-repeater-events";
import { credits, messages, repeater_msg_event } from "../msg/message-type";
import logger from "src/main/utils/logger";

window.addEventListener(repeater_msg_event, event => {

    const data = (event as CustomEvent).detail;

    if (
        typeof data != 'object'
        || !data.credit
        || typeof data.script != 'string'
    ) return;

    switch (data.credit) {
        case credits.context_menu:
            ignoreContextMenu(data.data);
            break;

        default:
            break;
    }

    return;
});

window.addEventListener('contextmenu', contextMenuEvent, true);
