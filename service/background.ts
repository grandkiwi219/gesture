import { setInitialGesture } from "./reset.js";

import { command_keys } from "./commands.js";

chrome.runtime.onInstalled.addListener(async d => {
    if (d.reason === 'install') {
        chrome.runtime.openOptionsPage();
        setInitialGesture();
    }
});

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.commands.onCommand.addListener(command => {
    switch (command) {
        case command_keys.run_options: 
            chrome.runtime.openOptionsPage();
            break;
        case command_keys.reset:
            console.log('옵션을 재설정합니다.');
            setInitialGesture();
            break;
        default:
            console.warn('알 수 없는 명령어');
            break;
    }
});
