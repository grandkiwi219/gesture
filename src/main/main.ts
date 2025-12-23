import { mouseDown, mouseMove, mouseUp, scriptMessage, storageChanged } from "./event";
import { scriptInjection } from "./utils/assets";
import { script_msg_event } from "src/repeater/msg/message-type";
import { mainAddEvent, mainRemoveEvent } from "./process";
import logger from "./utils/logger";


void function main() {

    // 파이어폭스에서'도' 사용 가능케 하기 위한 최선?의 방법
    scriptInjection(document.documentElement, 'src/repeater.js');

    const removeEvent = mainRemoveEvent(() => {
        window.removeEventListener('mousedown', mouseDown, true);
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

// 포트 번호까지 엄격 검사 모드
// sites 반전 -> 이 리스트에 있는 사이트만 사용 가능하게
// 일치 혹은 일치 가능한 커맨드 보여주는 거 만들기
// 지금 커맨드 보여주는 요소 위치 설정
