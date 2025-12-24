import { setIgnore_this_site_title } from "./context-menu-supports";

export const context_menu_data: { [key: string]: chrome.contextMenus.CreateProperties } = {
    open_options_page: {
        id: "open_options_page",
        title: "옵션 페이지 열기",
        contexts: ["all"]
    },
    separator_1: {
        id: "separator_1",
        type: "separator",
        contexts: ["all"]
    },
    ignore_this_site: {
        id: "ignore_this_site",
        title: setIgnore_this_site_title(false),
        contexts: ["all"]
    }
}


