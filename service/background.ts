import { setInitialGesture } from "./reset.js";

import { command_keys } from "./commands.js";
import { scripts } from "src/main/scripts/index.js";
import { messages } from "./msg/message-types.js";

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

chrome.runtime.onMessage.addListener((msg: BgMsg, sender, response) => {
    switch (msg.type) {
        case messages.tabs:
            tabsState(msg, sender, response);
            break;
        case messages.windows:
            if (sender.tab && sender.tab.windowId) {
                chrome.windows.update(sender.tab.windowId, { state: msg.state as chrome.windows.UpdateInfo["state"] });
            }
            break;
        default:
            break;
    }
});

function tabsState(msg: any, sender: chrome.runtime.MessageSender, response?: any) {
    switch (msg.state) {
        case 'remove':
            if (sender.tab && sender.tab.id) {
                chrome.tabs.remove(sender.tab.id);
            }
            break;

        case 'restore':
            chrome.sessions.restore();
            break;

        case 'move': 
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                let current_tab = tabs[0];
                if (current_tab.id && current_tab.index > 0) {
                    chrome.tabs.move(current_tab.id, { index: current_tab.index + msg.data });
                }
            });
            break;

        default:
            break;
    }
}
