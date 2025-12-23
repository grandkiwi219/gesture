import { setInitialGesture } from "service/reset";
import { direction_regex, storage_area, store } from "../consts";
import logger from "../utils/logger";
import { setCommand } from "../process";
import { variable } from "../variable";

export function storageChanged(
    changes: { [key: string]: chrome.storage.StorageChange; },
    area: chrome.storage.AreaName
) {
    if (area != storage_area) return;

    let changed_items = Object.keys(changes);

    /* if (changed_items.indexOf('') != -1) {

    } */

    if (changed_items.indexOf(store) != -1) {
        const old_value = (changes[store].oldValue as string[]) || [];
        const new_value = (changes[store].newValue as string[]) || [];

        if (!Array.isArray(new_value)) {
            logger.warn('키 값이 변경되었습니다. 하짐나 키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작합니다.');

            setInitialGesture();
            setCommand();
        }

        const oldSet = new Set(old_value);
        const newSet = new Set(new_value);

        const added = new_value.filter(r => !oldSet.has(r));
        added.forEach(item => itemChecker(item));

        const removed = old_value.filter(r => !newSet.has(r));
        removed.forEach(item => {
            variable.command_store.delete(item);
        });

        const store_index = changed_items.indexOf(store);
        if (store_index > -1) {
            changed_items.splice(store_index, 1);
        }

        const maintained = new_value.filter(r => oldSet.has(r));
        changed_items = changed_items.filter(r => maintained.includes(r));
    }

    for (const item of changed_items) {
        itemChecker(item);
    }

    function itemChecker(item_key: string) {
        if (!direction_regex.test(item_key)) return;

        const gesture = changes[item_key].newValue as Gesture;

        if (
            typeof gesture.description != 'string'
            || typeof gesture.script != 'string'
            || typeof gesture.type != 'string'
        ) {
            variable.command_store.delete(item_key);
            return;
        }

        variable.command_store.set(item_key, gesture);
    }
}
