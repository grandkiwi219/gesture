import { messages } from "./message-types";

export function backgroundMessageScript(msg: BgMsg, sender: chrome.runtime.MessageSender, response: (response?: any) => void) {
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
}

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
