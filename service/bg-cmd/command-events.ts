import { command_keys } from "service/bg-cmd/commands-types";
import { setInitialGesture } from "service/reset";
import { storage_area, storage_keys } from "src/main/consts";

export function backgroundCommand(command: string, tab?: chrome.tabs.Tab | undefined): void {
    switch (command) {
        case command_keys.run_options_page: 
            chrome.runtime.openOptionsPage();
            break;

        case command_keys.reset_gesture:
            console.log('제스처를 재설정합니다.');
            setInitialGesture(true);
            break;

        case command_keys.reset_options:
            console.log('옵션을 재설정합니다.');
            chrome.storage[storage_area].remove(storage_keys.options);
            break;

        default:
            console.warn('알 수 없는 명령어');
            break;
    }
}
