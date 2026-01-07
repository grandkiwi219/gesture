import { contextMenuEvent, executeCustomScript, ignoreContextMenu } from "./msg/message-repeater-events";
import { credits, repeater_msg_event } from "./msg/message-type";
import logger from "src/main/utils/logger";

window.addEventListener('message', event => {

    if (event.data.event != repeater_msg_event) return;
    
    const data: RepeaterMessage | null = event.data.detail;

    if (
        !(data instanceof Object)
        || !data.credit
        || typeof data.script != 'string'
    ) return;

    switch (data.credit) {
        case credits.context_menu:
            ignoreContextMenu(data.data);
            break;

        case credits.custom_script_message:
            executeCustomScript(data.script);
            break;

        default:
            break;
    }

    return;
});

window.addEventListener('contextmenu', contextMenuEvent, true);
