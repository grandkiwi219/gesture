import initial_gesture from "./initial_gesture";
import { store } from "../src/consts";

export function setInitialGesture() {

    chrome.storage.local.clear();

    let key_list: any[] = [];

    Object.keys(initial_gesture).forEach((ges) => {
        const key = ges as keyof typeof initial_gesture;
        chrome.storage.local.set({ [ges]: initial_gesture[key] });
        key_list.push(ges);
    });
    
    chrome.storage.local.set({ [store]: key_list });
}
