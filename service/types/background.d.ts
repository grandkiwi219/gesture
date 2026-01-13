interface BgMsg {
    type: string;
    state: string;
    data?: any;
}

interface StorageChanges {
    [key: string]: chrome.storage.StorageChange;
}
