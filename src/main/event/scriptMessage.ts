import { scriptMessageRun } from "src/repeater/msg/message-script-events";
import { credits } from "src/repeater/msg/message-type";

export function scriptMessage(event: Event) {
    const data = (event as CustomEvent).detail;

    if (!data.credit || typeof data.script != 'string') return;

    switch (data.credit) {
        case credits.script_message:
            scriptMessageRun(data.script, data.data);
            break;

        default:
            break;
    }

    return;
}
