import { scriptMessageRun } from "src/repeater/msg/message-script-events";
import { credits } from "src/repeater/msg/message-type";

/**
 * @description 커스텀 스크립트가 리피터를 통해서 실행될 때, 그 안에서 내장 스크립트들을 사용할 수 있게 하기 위해 만든 것. 
 * @deprecated 
 */
export function scriptMessage(event: Event) {
    const data = (event as CustomEvent).detail;

    if (!data.credit || typeof data.script !== 'string') return;

    switch (data.credit) {
        case credits.script_message:
            scriptMessageRun(data.script, data.data);
            break;

        default:
            break;
    }

    return;
}
