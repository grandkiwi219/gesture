import initial_gesture from "./initial_gesture";
import { sites, storage_area, store } from "../src/main/consts";

export function setInitialGesture() {

    chrome.storage[storage_area].get([sites]).then(re => {
        const sites_result = re[sites];

        chrome.storage[storage_area].clear();
    
        chrome.storage[storage_area].set({
            ...initial_gesture,
            [store]: Object.keys(initial_gesture)
        });

        if (sites_result && Array.isArray(sites_result)) {
            chrome.storage[storage_area].set({
                [sites]: sites_result
            });
        }
    })

}
