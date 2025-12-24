import { context_menu_data } from "./context-menu-types";

export function createContextMenu(details?: chrome.runtime.InstalledDetails): void {
    chrome.contextMenus.removeAll();
    Object.values(context_menu_data).forEach(data => {
        chrome.contextMenus.create(data)
    });
}
