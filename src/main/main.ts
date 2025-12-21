import { messageEv, mouseDown, mouseMove, mouseUp } from "./event";
import { variable } from "./variable";
import consts from "./consts";
import { setInitialGesture } from "service/reset";
import logger from "./utils/logger";


void function main() {
    
    window.addEventListener('mousemove', mouseMove);
    
    window.addEventListener('mousedown', mouseDown);

    window.addEventListener('mouseup', mouseUp);

    chrome.storage.local.get([consts.store]).then(results => {
        const keys = results[consts.store];
        if (!keys || !Array.isArray(keys)) {
            logger.warn('키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작 후 재시작합니다.');
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
            setInitialGesture();
            main();
            return;
        }

        const filtered_keys = keys.filter(r => typeof r == 'string');

        chrome.storage.local.get(filtered_keys).then(result => {
            filtered_keys.forEach(key => {
                const re = result[key] as Gesture;
                variable.command_store.set(key, re);
            });
        });
    });

    window.addEventListener('message', messageEv);
}();
