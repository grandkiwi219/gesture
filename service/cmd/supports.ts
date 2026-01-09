
export async function sendContentMessage(message: ContentMessage) {
    await chrome.tabs.query({}).then(tabs => {
        tabs.forEach(tab => {
            if (tab.id)
                chrome.tabs.sendMessage(tab.id, message);
        });
    });
    await chrome.runtime.sendMessage(message);
}