import { isUserScriptsAvailable, sendCsMsg } from "service/utils";
import { messages } from "./message-types";
import { chromeVersion } from "src/chromeVersion";
import { is135orMore, is138orMore } from "src/isVersion";
import { isChromium } from "src/isBrowser";

export function backgroundMessageScript(msg: BgMsg, sender: chrome.runtime.MessageSender, response: (response?: any) => void) {
    switch (msg.type) {
        case messages.tabs:
            tabsState(msg, sender, response);
            return;

        case messages.windows:
            if (sender.tab && sender.tab.windowId) {
                chrome.windows.update(sender.tab.windowId, { state: msg.state as chrome.windows.UpdateInfo["state"] });
            }
            return;

        case messages.custom_script:
            customScriptState(msg, sender, response);
            return;

        default: return;
    }
}

function tabsState(msg: BgMsg, sender: chrome.runtime.MessageSender, response?: (response?: any) => void) {
    switch (msg.state) {
        case 'remove':
            if (sender.tab && sender.tab.id) {
                chrome.tabs.remove(sender.tab.id);
            }
            break;

        case 'restore':
            chrome.sessions.restore();
            break;

        case 'focus': 
            chrome.tabs.query({currentWindow: true}).then(tabs => {
                const activeTab = tabs.find(tab => tab.active);
            
                if (!activeTab) return;

                let newIndex;
                if (msg.data.direction == 'left') {
                    newIndex = (activeTab.index - (parseInt(msg.data.pages) || 0) + tabs.length) % tabs.length;
                }
                else {
                    newIndex = (activeTab.index + (parseInt(msg.data.pages) || 0)) % tabs.length;
                }

                const targetTab = tabs.find(tab => tab.index === newIndex);
                if (targetTab) {
                    chrome.tabs.update(targetTab.id, {active: true});
                }
            });
            break;
            

        case 'move': 
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                let current_tab = tabs[0];
                if (current_tab.id && current_tab.index > 0) {
                    chrome.tabs.move(current_tab.id, { index: current_tab.index + (parseInt(msg.data) || 0) });
                }
            });
            break;

        default:
            break;
    }
}

function customScriptState(msg: BgMsg, sender: chrome.runtime.MessageSender, response?: (response?: any) => void) {
    switch (msg.state) {
        case 'MAIN': {
            if (!sender.tab?.id) return console.error('커스텀 스크립트를 실행할 탭 위치를 찾지 못하였습니다.');

            if (isUserScriptsAvailable()) {
                const js_code =
`
!function() {

${msg.data}

}();
`;

                try {
                    chrome.userScripts.execute({
                        js: [{ code: js_code }],
                        target: { tabId: sender.tab.id },
                        world: 'MAIN',
                    });
                } catch (error) {
                    console.error('커스텀 스크립트를 실행하는 도중에 오류가 발생하였습니다:', error);
                    sendCsMsg(sender.tab.id, {
                        credit: 'console-error',
                        data: {
                            type: 'alert',
                            error: error
                        }
                    });
                }
            }
            else {
                const error_msg = isChromium
                ? (is138orMore ? '사용자 스크립트 허용이 필요합니다.' : (is135orMore ? '개발자 모드를 요구합니다.' : '버전이 135 버전 미만이므로 사용이 불가능합니다.'))
                : '크로미윰 기반 브라우저가 아닙니다.'

                sendCsMsg(sender.tab.id, {
                    credit: 'console-error',
                    data: {
                        type: 'alert',
                        error: error_msg
                    }
                });
            }

            return;
        }

        default: return;
    }
}

