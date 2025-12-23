import initial_gesture from "./initial_gesture";
import { storage_area, store } from "../src/main/consts";

export function setInitialGesture() {

    chrome.storage[storage_area].clear();

    let key_list: any[] = [];

    Object.keys(initial_gesture).forEach((ges) => {
        chrome.storage[storage_area].set({ [ges]: initial_gesture[ges] });
        key_list.push(ges);
    });
    
    chrome.storage[storage_area].set({ [store]: key_list });
}
