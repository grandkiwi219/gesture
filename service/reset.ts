import initial_gesture from "./initial_gesture";
import { storage_area, store } from "../src/main/consts";

export function setInitialGesture() {

    chrome.storage[storage_area].clear();

    chrome.storage[storage_area].set({
        ...initial_gesture,
        [store]: Object.keys(initial_gesture)
    });
}
