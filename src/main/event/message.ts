import { messageScript } from "src/msg/message-script-events";
import { credits } from "src/msg/message-type";

export function messageEv(event: MessageEvent<RepeaterMessage>) {
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
