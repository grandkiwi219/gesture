import { setInitialGesture } from "./reset.js";

import { backgroundCommand } from "./cmd/command-events";
import { backgroundMessageScript } from "./msg/message-script-events.js";
import { contextMenuEvent, contextMenuStartEvent } from "./contextMenu/context-menu-event.js";
import { createContextMenu } from "./contextMenu/context-menu-create.js";
import { decideIgnore_this_site_title, setIgnore_this_site_set } from "./contextMenu/context-menu-supports.js";
import { sites, storage_area } from "src/main/consts.js";

chrome.runtime.onInstalled.addListener(async d => {
    if (d.reason === 'install') {
        chrome.runtime.openOptionsPage();
        setInitialGesture();
    }
    
    createContextMenu();

    // context-menu
    contextMenuStartEvent();
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        if (tabs[0]) {
            decideIgnore_this_site_title(tabs[0].url);
        }
    });
});

chrome.runtime.onStartup.addListener(() => {
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
    // context-menu
    if (changeInfo.status === 'complete') {
        chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            if (tabs[0] && tabs[0].id == tabId) {
                decideIgnore_this_site_title(tabs[0].url);
            }
        });
    }
});

chrome.storage.onChanged.addListener(async (changes, area) => {
    // context-menu
    if (area == storage_area) {
        setIgnore_this_site_set(changes[sites].newValue);
        chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            if (tabs[0]) {
                decideIgnore_this_site_title(tabs[0].url);
            }
        });
    }
});
