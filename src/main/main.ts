import { generatorMessage, mouseDown, mouseMove, mouseUp, scriptMessage, storageChanged } from "./event";
import { scriptInjection } from "./utils/assets";
import { repeater_msg_event, script_msg_event } from "src/repeater/msg/message-type";
import { mainAddEvent, mainRemoveEvent, setCommand, setOptions } from "./process";
import { variable } from "./variable";
import logger from "./utils/logger";


void function main() {

    scriptInjection(document.documentElement, 'src/repeater.js');

    variable.mouseMove = mouseMove;

    setOptions();

    const removeEvent = mainRemoveEvent(() => {
        window.removeEventListener('mousedown', mouseDown, true);
        window.removeEventListener('mouseup', mouseUp, true);
        window.removeEventListener('message', generatorMessage, true);
        // window.removeEventListener(script_msg_event, scriptMessage);
    });

    const addEvent = mainAddEvent(() => {

        window.addEventListener('mousedown', mouseDown, true);

        window.addEventListener('mouseup', mouseUp, true);

        window.addEventListener('message', generatorMessage, true);

        // window.addEventListener(script_msg_event, scriptMessage);

        setCommand(removeEvent);
    });
    addEvent();

    chrome.runtime.onMessage.addListener(mainStorageChanged);
    function mainStorageChanged(message: ContentMessage, sender: chrome.runtime.MessageSender, sendResponse: ((response?: any) => void)) {
        storageChanged(message, addEvent, removeEvent);
    }
}();

// 포트 번호까지 엄격 검사 모드
// sites 반전 -> 이 리스트에 있는 사이트만 사용 가능하게
// 일치 혹은 일치 가능한 커맨드 보여주는 거 만들기
// 지금 커맨드 보여주는 요소 위치 설정
