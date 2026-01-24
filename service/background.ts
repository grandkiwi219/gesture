import { setInitialGesture } from "./reset.js";

import { backgroundCommand } from "./bg-cmd/command-events";
import { backgroundMessageScript } from "./msg/message-script-events.js";
import { contextMenuEvent, contextMenuStartEvent } from "./contextMenu/context-menu-event.js";
import { createContextMenu } from "./contextMenu/context-menu-create.js";
import { decideIgnore_this_site_title, setIgnore_this_site_set } from "./contextMenu/context-menu-supports.js";
import { storage_keys, storage_area } from "src/main/consts.js";
import { loadCommand, loadSites, loadStorageChanged } from "./cmd/index.js";

chrome.runtime.onInstalled.addListener(async d => {
    switch (d.reason) {
        case chrome.runtime.OnInstalledReason.INSTALL: {
            chrome.runtime.openOptionsPage();
            await setInitialGesture(true);
            break;
        }

        case chrome.runtime.OnInstalledReason.UPDATE: {
            break;
        }

        default: break;
    }


    // context-menu
    createContextMenu();

    contextMenuStartEvent();
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        if (tabs[0]) {
            decideIgnore_this_site_title(tabs[0].url);
        }
    });
});

chrome.runtime.onStartup.addListener(async () => {

    // context-menu
    contextMenuStartEvent();
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        if (tabs[0]) {
            decideIgnore_this_site_title(tabs[0].url);
        }
    });
});

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});

chrome.commands.onCommand.addListener(backgroundCommand);

chrome.contextMenus.onClicked.addListener(contextMenuEvent);

chrome.runtime.onMessage.addListener(backgroundMessageScript);

chrome.tabs.onActivated.addListener(activeInfo => {
    // context-menu
    chrome.tabs.get(activeInfo.tabId, tab => {
        decideIgnore_this_site_title(tab.url);
    });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // context-menu
        chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            if (tabs[0] && tabs[0].id == tabId) {
                decideIgnore_this_site_title(tabs[0].url);
            }
        });
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area == storage_area) {

        // gesture-command
        loadStorageChanged(changes);


        // context-menu
        if (changes[storage_keys.sites]) {
            setIgnore_this_site_set(changes[storage_keys.sites].newValue);
            chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
                if (tabs[0]) {
                    decideIgnore_this_site_title(tabs[0].url);
                }
            });
        }
        
    }
});
