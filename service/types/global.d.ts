type GesturePainting = string;

interface Gesture {
    gesturePainting?: GesturePainting;
    description: string;
    type: string;
    script: string;
}

interface BgMsg {
    type: string;
    state: string;
    data?: any;
}

interface StorageChanges {
    [key: string]: chrome.storage.StorageChange;
}
