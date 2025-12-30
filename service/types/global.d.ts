type GesturePainting = string;

type GestureType = 'script' | 'custom_script';

interface Gesture {
    gesturePainting?: GesturePainting;
    description: string;
    type: GestureType;
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
