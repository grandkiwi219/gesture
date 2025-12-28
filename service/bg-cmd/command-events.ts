import { command_keys } from "service/bg-cmd/commands-types";
import { setInitialGesture } from "service/reset";

export function backgroundCommand(command: string, tab?: chrome.tabs.Tab | undefined): void {
    switch (command) {
        case command_keys.run_options: 
            chrome.runtime.openOptionsPage();
            break;
        case command_keys.reset:
            console.log('옵션을 재설정합니다.');
            setInitialGesture(true);
            break;
        default:
            console.warn('알 수 없는 명령어');
            break;
    }
}
