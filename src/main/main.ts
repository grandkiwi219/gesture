import { mouseDown, mouseMove, mouseUp, scriptMessage, storageChanged } from "./event";
import { scriptInjection } from "./utils/assets";
import { messages, repeater_msg_event, script_msg_event } from "src/repeater/msg/message-type";
import { mainAddEvent, mainRemoveEvent, setCommand } from "./process";
import logger from "./utils/logger";
import { variable } from "./variable";


void function main() {

    // 파이어폭스에서'도' 사용 가능케 하기 위한 최선?의 방법
    scriptInjection(document.documentElement, 'src/repeater.js');

    const removeEvent = mainRemoveEvent(() => {
        window.removeEventListener('mousedown', mouseDown);
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener(script_msg_event, scriptMessage);
    });

    const addEvent = mainAddEvent(removeEvent, () => {
        window.addEventListener('mousedown', mouseDown, true);

        window.addEventListener('mouseup', mouseUp);

        window.addEventListener(script_msg_event, scriptMessage);
    });
    addEvent();
    
    chrome.storage.onChanged.addListener(mainStorageChanged);
    function mainStorageChanged(
        changes: { [key: string]: chrome.storage.StorageChange; },
        area: chrome.storage.AreaName
    ) {
        storageChanged(changes, area, addEvent, removeEvent);
    }
}();

// 크기 변경 감지
// 커스텀 스크립트일 경우 메세지를 보내서 실행하게 하기
// 일치 혹은 일치 가능한 커맨드 보여주는 거 만들기
// 지금 커맨드 보여주는 요소 위치 설정
