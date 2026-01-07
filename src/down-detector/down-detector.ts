import { sendToScript } from "src/main/dispatch";
import { credits } from "src/repeater/msg/message-type";


void function() {
    window.addEventListener('mousedown', event => {
        if (event.button != 2) {
            return;
        }

        sendToScript(
            {
                credit: credits.mousedown_messages,
                script: '',
                data: {
                    coord: { x: event.clientX, y: event.clientY }
                }
            }
        );
    }, true);
}();
