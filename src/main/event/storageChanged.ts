import { setInitialGesture } from "service/reset";
import { regex, sites, storage_area, store } from "../consts";
import logger from "../utils/logger";
import { decideThisSIte, setCommand } from "../process";
import { variable } from "../variable";

export function storageChanged(
    changes: { [key: string]: chrome.storage.StorageChange; },
    area: chrome.storage.AreaName,
    addEvent: Function,
    removeEvent: Function
) {
    if (area != storage_area) return;

    let changed_items = Object.keys(changes);
    const changed_items_set = new Set(changed_items);

    if (changed_items_set.has(sites)) {
        const ignore_keys = changes[sites].newValue as string[];
        if (decideThisSIte(ignore_keys, removeEvent))
            return;

        if (!variable.main_running) {
            addEvent();
        }
        const ignore_index = changed_items.indexOf(sites);
        if (ignore_index > -1) {
            changed_items.splice(ignore_index, 1);
        }
    }

    if (changed_items_set.has(store)) {
        const old_value = (changes[store].oldValue as string[]) || [];
        const new_value = (changes[store].newValue as string[]) || [];

        if (!Array.isArray(new_value)) {
            logger.warn('키 값이 변경되었으나, 키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작합니다.');

            setInitialGesture();
            setCommand(removeEvent);
            return;
        }

        const old_set = new Set(old_value);
        const new_set = new Set(new_value);

        const added = new_value.filter(r => !old_set.has(r));
        added.forEach(item => itemChecker(item));

        const removed = old_value.filter(r => !new_set.has(r));
        removed.forEach(item => {
            variable.command_store.delete(item);
        });

        const added_set = new Set(added);
        changed_items = changed_items.filter(r => 
            r != store
            && !added_set.has(r)
            && new_set.has(r)
        );
    }

    for (const item of changed_items) {
        itemChecker(item);
    }

    function itemChecker(item_key: string) {
        if (!regex.direction.test(item_key)) return;

        const change = changes[item_key];
        if (!change || !change.newValue) return;

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
