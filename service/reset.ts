import initial_gesture from "./initial_gesture";
import { store } from "../src/main/consts";

export function setInitialGesture() {

    chrome.storage.local.clear();

    let key_list: any[] = [];

    Object.keys(initial_gesture).forEach((ges) => {
        chrome.storage.local.set({ [ges]: initial_gesture[ges] });
        key_list.push(ges);
    });
    
    chrome.storage.local.set({ [store]: key_list });
}
