import { mouseDown, mouseMove, mouseUp, scriptMessage, storageChanged } from "./event";
import { mainAddEvent, mainRemoveEvent, setCommand, setOPtions } from "./process";
import { variable } from "./assets/variable";
import logger from "./utils/logger";
import { sendAcknowledgeContextMenu } from "./dispatch";


void function main() {

    variable.mouseMove = mouseMove;

    setOPtions();

    function mouseDownOnlyReset(event: MouseEvent) {
        mouseDown(event, { only_reset: true });
    }

    const removeEvent = mainRemoveEvent(() => {
        window.removeEventListener('mousedown', mouseDownOnlyReset, true);
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('message', scriptMessage);
    });

    const addEvent = mainAddEvent(() => {
        
        sendAcknowledgeContextMenu();

        window.addEventListener('mousedown', mouseDownOnlyReset, true);
        
        window.addEventListener('mouseup', mouseUp);
        
        window.addEventListener('message', scriptMessage);

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
