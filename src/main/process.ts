import { gesture_type } from "service/consts";
import logger from "./utils/logger";
import { variable } from "./variable";
import { scripts } from "./scripts";
import { stopDrawing } from "./drawing";
import { mouseMove } from "./event";
import { storage_keys, storage_area } from "./consts";
import { options } from "./enum";
import { credits, repeater_msg_event } from "src/repeater/msg/message-type";
import { encodeMap, merge, sendBgMsg } from "./utils/utils";
import utils from "page/utils/utils";
import { messages } from "service/msg/message-types";
import { isChromium } from "src/isBrowser";
import { is135orMore } from "src/isVersion";

export function mainAddEvent(addEvent: Function): (() => void) {
    return function() {
        variable.main_running = true;
        addEvent();
    }
}

export function mainRemoveEvent(removeEvent: Function): (() => void) {
    return function() {
        variable.main_running = false;
        removeEvent();
    }
}

export function exitRun() {

    const result_command = getCommandData();

    if (result_command) {
        const script_type = gesture_type[result_command.type as keyof typeof gesture_type];
        switch (script_type) {
            case gesture_type.script:
                gestureScript(result_command.script);
                break;
            case gesture_type.custom_script:
                gestureCustomScript(result_command.script);
                break;
            default:
                break;
        }
    }
}

export function exitReset(
    {
    stop_drawing = true, remove_mouse_move = true, reset_directions = true, execution
    }
    : ExitReset = {}
) {
    if (typeof execution == 'function') {
        execution();
    }

    if (remove_mouse_move && variable.mouseMove)
        window.removeEventListener('mousemove', variable.mouseMove, true);

    if (reset_directions) variable.directions.reset();
    variable.starting = false;
    variable.executing = false;
    
    variable.position.reset();
    variable.initial_pos.reset();
    variable.last_pos.reset();
    variable.changed_pos.reset();

    if (stop_drawing) stopDrawing();
}

export function getCommandData() {
    return variable.command_store.get(variable.directions.data.join(''));
}

export async function setCommand(removeEvent?: Function) {
    return await chrome.storage[storage_area].get([storage_keys.store, storage_keys.sites]).then(async results => {
        if (decideThisSIte(results[storage_keys.sites], removeEvent))
            return;

        const store_keys = results[storage_keys.store];

        if (!Array.isArray(store_keys)) {
            logger.error('스토어가 존재하지 않거나 배열의 형태가 아닙니다.');
            return;
        }

        const filtered_keys = store_keys.filter((r) => typeof r == 'string');

        await chrome.storage[storage_area].get(filtered_keys).then(result => {
            variable.command_store = encodeMap<Gesture>(filtered_keys, result as KeyObject<Gesture>);
        });
    });
}

export async function setOptions() {
    await chrome.storage[storage_area].get([storage_keys.options]).then(r => {
        decideOptions(r[storage_keys.options]);
    });
}

export function decideOptions(storage_options: any) {
    if (typeof storage_options == 'object') {
        merge(options, storage_options);
    }
    else if (typeof storage_options != 'undefined') {
        chrome.storage[storage_area].remove([storage_keys.options]);
    }
}

export function decideThisSIte(sites: any, removeEvent?: Function) {
    if (removeEvent && Array.isArray(sites)) {
        if (sites.includes(location.hostname)) {
            removeEvent();
            exitReset();
            variable.command_store.clear();
            return true;
        }
    }

    return false;
}

function gestureScript(script_key: string) {
    const result = scripts[script_key as keyof typeof scripts];
    if (!result) return logger.warn(script_key, '→ 본 확장프로그램이 지닌 스크립트 중에 이러한 것은 존재하지 않습니다.');

    try {
        result.script();
    } catch (error) {
        logger.error(result.key, error);
        utils.showAlert({ msg: '제스처 명령어를 실행하는 도중에 오류가 발생했습니다.' });
    }
}

function gestureCustomScript(custom_script: string) {
    if (isChromium && is135orMore) {
        sendBgMsg({
            type: messages.custom_script,
            state: 'MAIN',
            data: custom_script
        });
    }
    else {
        const message: RepeaterMessage = {
            credit: credits.custom_script_message,
            script: custom_script,
            data: null
        }

        window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(message) }));
    }
}
