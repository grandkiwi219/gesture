import initial_gesture from "./initial_gesture";
import { sites, storage_area, store } from "../src/main/consts";

export async function setInitialGesture() {

    const re = await chrome.storage[storage_area].get([sites]);
    
    const sites_result = re[sites];

    await chrome.storage[storage_area].clear();

    await chrome.storage[storage_area].set({
        ...initial_gesture,
        [store]: Object.keys(initial_gesture)
    });

    if (sites_result && Array.isArray(sites_result)) {
        await chrome.storage[storage_area].set({
            [sites]: sites_result
        });
    }

}
