import { mouseDown, mouseMove, mouseUp, scriptMessage, storageChanged } from "./event";
import { scriptInjection } from "./utils/assets";
import { script_msg_event } from "src/msg/message-type";
import { setCommand } from "./process";
import logger from "./utils/logger";


void function once() {

    // 파이어폭스에서'도' 사용 가능케 하기 위한 최선?의 방법
    scriptInjection(document.documentElement, 'src/repeater.js');
}();

void function main() {

    // window.addEventListener('mousemove', mouseMove, true);

    window.addEventListener('mousedown', mouseDown, true);

    window.addEventListener('mouseup', mouseUp);

    window.addEventListener(script_msg_event, scriptMessage);

    setCommand();
    
    chrome.storage.onChanged.addListener(storageChanged);
}();

// storage onChanged, 사용 미사용 감지
// 크기 변경 감지
// 특정 사이트에서 사용 금지
// 커스텀 스크립트일 경우 메세지를 보내서 실행하게 하기
// 일치 혹은 일치 가능한 커맨드 보여주는 거 만들기
// 지금 커맨드 보여주는 요소 위치 설정
