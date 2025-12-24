import consts, { regex, sites } from "src/main/consts";
import { context_menu_data } from "./context-menu-types";
import { setIgnore_this_site_set } from "./context-menu-supports";

let waiting: { [key: string]: boolean } = {
    ignore_this_site: false,
}

export function contextMenuEvent(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) {
    switch (info.menuItemId) {
        case context_menu_data.open_options_page.id:
            chrome.runtime.openOptionsPage();
            break;

        case context_menu_data.ignore_this_site.id:
            if (waiting.ignore_this_site) break;
            if (!tab?.url) break;

            const non_filter_host = tab.url.match(regex.host);
            if (!non_filter_host) {
                break;
            }

            const host = non_filter_host[0];

            chrome.storage[consts.storage_area].get([sites]).then(r => {

                const result = r[sites];

                if (!Array.isArray(result)) {
                    waiting.ignore_this_site = true;
                    chrome.storage[consts.storage_area].set({ [sites]: [host] })
                        .then(() => {
                            waiting.ignore_this_site = false;
                        });
                    return;
                }

                if (result.includes(host)) {
                    waiting.ignore_this_site = true;
                    chrome.storage[consts.storage_area].set({ [sites]: result.filter(r => r != host) })
                        .then(() => {
                            waiting.ignore_this_site = false;
                        });
                    return;
                }

                result.push(host);

                waiting.ignore_this_site = true;
                chrome.storage[consts.storage_area].set({ [sites]: result })
                    .then(() => {
                        waiting.ignore_this_site = false;
                    });
            });
            break;

        default:
            break;
    }
}

export function contextMenuStartEvent() {
    chrome.storage[consts.storage_area].get([sites]).then(r => {
        setIgnore_this_site_set(r[sites]);
    });
}
