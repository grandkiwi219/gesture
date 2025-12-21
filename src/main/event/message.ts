import { messageScript } from "src/repeater/message-script-events";
import { credits } from "src/repeater/message-type";

export function messageEv(event: MessageEvent<Message>) {
        const data = event.data;
    
        if (!data.credit || typeof data.script != 'string') return;
    
        switch (data.credit) {
            case credits.script_message:
                if (typeof data.script == 'string')
                    messageScript(data.script);
                break;
    
            default:
                break;
        }
        return;
}
