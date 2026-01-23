import initial_gesture from "./initial_gesture";
import { storage_keys, storage_area } from "../src/main/consts";
import { bg_state } from "./variable";
import { bg_consts } from "./consts";
import { sendAllCsMsg } from "./utils";

export async function setInitialGesture(use_state: boolean = false) {
    if (use_state) bg_state.loaded_command = false;

    const re = await chrome.storage[storage_area].get([storage_keys.sites, storage_keys.options]);

    const sites_result = re[storage_keys.sites];

    await chrome.storage[storage_area].clear();

    if (sites_result && Array.isArray(sites_result)) {
        await chrome.storage[storage_area].set({
            [storage_keys.sites]: sites_result,
            [storage_keys.options]: re[storage_keys.options]
        });
    }

    await chrome.storage[storage_area].set({
        [storage_keys.options]: re[storage_keys.options]
    });

    await chrome.storage[storage_area].set({
        ...initial_gesture,
        [storage_keys.store]: Object.keys(initial_gesture)
    })

    if (use_state) {
        await sendAllCsMsg({ credit: 'commands', data: null });
        bg_state.loaded_command = true;
    }
}
