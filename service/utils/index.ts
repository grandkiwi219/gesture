export function sendCsMsg(tabId: number, msg: ContentMessage) {
    chrome.tabs.sendMessage(tabId, msg);
}

export async function sendAllCsMsg(message: ContentMessage) {
    await chrome.tabs.query({}).then(tabs => {
        tabs.forEach(tab => {
            if (tab.id)
                chrome.tabs.sendMessage(tab.id, message);
        });
    });
    await chrome.runtime.sendMessage(message);
}

export function isUserScriptsAvailable() {
    try {
        // Method call which throws if API permission or toggle is not enabled.
        chrome.userScripts.getScripts();
        return true;
    } catch {
        // Not available.
        return false;
    }
}
