import consts, { regex, sites } from "src/main/consts";
import { context_menu_data } from "./context-menu-types";
import { bg_variable } from "service/variable";


export function setIgnore_this_site_title(ignore: boolean) {
    return ignore ? '이 사이트에서 사용하기' : '이 사이트에서 무시하기' ;
}

export function updateIgnore_this_site_title(ignore: boolean) {
    chrome.contextMenus.update(context_menu_data.ignore_this_site.id!, { title: setIgnore_this_site_title(ignore) });
}

export function decideIgnore_this_site_title(url: string | null | undefined) {
    if (typeof url != 'string') {
        updateIgnore_this_site_title(false);
        return;
    }

    const host = url.match(regex.host);

    if (host && bg_variable.sites.has(host[0])) {
        console.log(`storage[${sites}]:`, host, '-', true);
        updateIgnore_this_site_title(true);
        return;
        // return { state: true, host: host };
    }
    console.log(`storage[${sites}]:`, host, '-', false);
    updateIgnore_this_site_title(false);
    // return { state: true, host: host };
}

export function setIgnore_this_site_set(result: string[] | undefined | unknown) {
    if (!result || !Array.isArray(result)) {
        chrome.storage[consts.storage_area].remove([sites]);
        return;
        // return false;
    }
    bg_variable.sites = new Set(result);
    // return true;
}
