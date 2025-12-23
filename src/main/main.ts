import { mouseDown, mouseMove, mouseUp, scriptMessage } from "./event";
import { variable } from "./variable";
import consts from "./consts";
import { setInitialGesture } from "service/reset";
import logger from "./utils/logger";
import { scriptInjection } from "./utils/assets";
import { script_msg_event } from "src/msg/message-type";
import { exitReset } from "./process";


void function main() {

    // 파이어폭스에서'도' 사용 가능케 하기 위한 최선?의 방법
    scriptInjection(document.documentElement, 'src/repeater.js');

    // window.addEventListener('mousemove', mouseMove, true);

    window.addEventListener('mousedown', mouseDown, true);

    window.addEventListener('mouseup', mouseUp);

    window.addEventListener(script_msg_event, scriptMessage);

    chrome.storage.local.get([consts.store]).then(results => {
        const keys = results[consts.store];
        if (!keys || !Array.isArray(keys)) {

            logger.warn('키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작 후 재시작합니다.');

            // window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener(script_msg_event, scriptMessage);

            exitReset();
            setInitialGesture();
            main();
            return;
        }

        const filtered_keys = keys.filter(r => typeof r == 'string');

        chrome.storage.local.get(filtered_keys).then(result => {
            filtered_keys.forEach(key => {
                variable.command_store.set(key, result[key] as Gesture);
            });
        });
    });
}();

// storage onChanged, 사용 미사용 감지
// 크기 변경 감지
// 특정 사이트에서 사용 금지
// 커스텀 스크립트일 경우 메세지를 보내서 실행하게 하기
// 일치 혹은 일치 가능한 커맨드 보여주는 거 만들기
// 지금 커맨드 보여주는 요소 위치 설정
