import initial_gesture from "./initial_gesture";
import { storage_keys, storage_area } from "../src/main/consts";
import { bg_state } from "./variable";

export async function setInitialGesture(use_state: boolean = false) {
    if (use_state) bg_state.loaded_command = false;

    const re = await chrome.storage[storage_area].get([storage_keys.sites]);
    
    const sites_result = re[storage_keys.sites];

    await chrome.storage[storage_area].clear();

    if (sites_result && Array.isArray(sites_result)) {
        await chrome.storage[storage_area].set({
            [storage_keys.sites]: sites_result
        });
    }

    if (use_state) bg_state.loaded_command = true;

    await chrome.storage[storage_area].set({
        ...initial_gesture,
        [storage_keys.store]: Object.keys(initial_gesture)
    });
}
