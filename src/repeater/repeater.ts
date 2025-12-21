import { acknowledgeContextMenu, contextMenuEvent, ignoreContextMenu } from "./message-normal-events";
import { messages } from "./message-type";
import logger from "src/main/utils/logger";

window.addEventListener('message', event => {
    const data = event.data;

    if (!data.credit || typeof data.script != 'string') return;

    switch (data.credit) {
        case messages.ignore_context_menu.credit:
            ignoreContextMenu();
            break;
        case messages.acknowledge_context_menu.credit:
            acknowledgeContextMenu();
            break;

        default:
            break;
    }

    return;
});

window.addEventListener('contextmenu', contextMenuEvent);
