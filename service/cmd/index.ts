import { setInitialGesture } from "service/reset";
import { bg_state, bg_variable } from "service/variable";
import { regex, sites, storage_area, store } from "src/main/consts";
import { decodeMap } from "src/main/utils/utils";

export async function loadCommand() {
    bg_state.loaded_command = false;

    await chrome.storage[storage_area].get([store]).then(async results => {

        const store_keys = results[store];
        if (!store_keys || !Array.isArray(store_keys)) {
            console.warn('키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작합니다.');

            await setInitialGesture();
            loadCommand();
            return;
        }

        const filtered_keys = store_keys.filter((r) => typeof r == 'string');

        bg_variable.command_store.clear();

        await chrome.storage[storage_area].get(filtered_keys).then(result => {
            filtered_keys.forEach(key => {
                const value = result[key] as Gesture;

                if (
                    typeof value != 'object'
                    || typeof value?.description != 'string'
                    || typeof value?.script != 'string'
                    || typeof value?.type != 'string'
                ) {
                    chrome.storage[storage_area].set({ [store]: filtered_keys.filter(r => r != key) });
                    chrome.storage[storage_area].remove(key);
                    return;
                }

                bg_variable.command_store.set(key, value);
            });
        });
    });

    bg_state.loaded_command = true;
}

export async function loadSites() {
    await chrome.storage[storage_area].get([sites]).then(results => {

        const result_sites = results[sites] as unknown as string[];
        if (Array.isArray(result_sites)) {
            bg_variable.sites = result_sites;
        }
    });
}

export async function loadStorageChanged(
    changes: StorageChanges
) {
    if (!bg_state.loaded_command) return;

    let changed_items = Object.keys(changes);

    let changed = {
        sites: false,
        commands: false
    }

    if (changed_items.includes(sites)) {
        const result_sites = changes[sites].newValue;
        if (Array.isArray(result_sites)) {
            // sites 전송
            const message: ContentMessage = {
                credit: 'sites',
                data: result_sites
            }
            chrome.tabs.query({}).then(tabs => {
                tabs.forEach(tab => {
                    if (tab.id)
                        chrome.tabs.sendMessage(tab.id, message);
                });
            });
            chrome.runtime.sendMessage(message);
            changed.sites = true;
        }
        
        const ignore_index = changed_items.indexOf(sites);
        if (ignore_index > -1) {
            changed_items.splice(ignore_index, 1);
        }
    }

    if (changed_items.includes(store)) {
        const old_value = changes[store].oldValue as string[] || [];
        const new_value = changes[store].newValue as string[];

        if (!Array.isArray(new_value)) {
            console.warn('키 값이 변경되었으나, 키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작합니다.');

            setInitialGesture(true);
            return;
        }

        changed.commands = true;

        const old_set = new Set(old_value);
        const new_set = new Set(new_value);

        const added = new_value.filter(r => !old_set.has(r));
        added.forEach(item => itemChecker(changes, item, false));

        const removed = old_value.filter(r => !new_set.has(r));
        removed.forEach(item => {
            bg_variable.command_store.delete(item);
        });

        const added_set = new Set(added);
        changed_items = changed_items.filter(r =>
            r != store  // 스토어 아님
            && !added_set.has(r)    // 추가된 거 제외
            && new_set.has(r)   // 스토어에 담긴 거 제외
        );
    }

    const storage_store = await chrome.storage[storage_area].get([store]);

    for (const item of changed_items) {
        itemChecker(changes, item, storage_store[store], changed);
    }

    // command_store 전송
    if (changed.sites || changed.commands) {
        const message: ContentMessage = {
            credit: 'commands',
            data: decodeMap(bg_variable.command_store)
        }
        chrome.tabs.query({}).then(tabs => {
            tabs.forEach(tab => {
                if (tab.id)
                    chrome.tabs.sendMessage(tab.id, message);
            });
        });
        chrome.runtime.sendMessage(message);
    }
}

function itemChecker(changes: StorageChanges, item_key: string, store?: any, changed?: { commands: boolean }) {
    if (!regex.direction.test(item_key)) return;

    const change = changes[item_key];
    if (!change || !change.newValue) return;

    const gesture = changes[item_key].newValue as Gesture;

    if (
        typeof gesture.description != 'string'
        || typeof gesture.script != 'string'
        || typeof gesture.type != 'string'
    ) {
        bg_variable.command_store.delete(item_key);
        return;
    }

    if (Array.isArray(store) && !store.includes(item_key)) {
        return;
    }

    bg_variable.command_store.set(item_key, gesture);

    if (changed) changed.commands = true;
}
