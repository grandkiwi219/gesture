import { gesture_type } from "service/consts";
import logger from "./utils/logger";
import { variable } from "./variable";
import { scripts } from "./scripts";
import { stopDrawing } from "./drawing";
import { mouseMove } from "./event";
import consts, { sites, storage_area } from "./consts";
import { setInitialGesture } from "service/reset";
import { credits, repeater_msg_event } from "src/repeater/msg/message-type";

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
    stop_drawing = true, remove_mouse_move = true
    }
    : ExitReset = {}
) {
    if (remove_mouse_move && variable.mouseMove)
        window.removeEventListener('mousemove', variable.mouseMove);

    variable.directions.reset();
    variable.starting = false;
    variable.executing = false;
    variable.position = {
        x: -1,
        y: -1,
    };
    variable.initial_pos = {
        x: -1,
        y: -1,
    };
    variable.last_pos = {
        x: -1,
        y: -1
    }

    if (stop_drawing) stopDrawing();
}

export function getCommandData() {
    return variable.command_store.get(variable.directions.data.join(''));
}

export async function setCommand(removeEvent: Function) {
    chrome.storage[storage_area].get([consts.store, sites]).then(async results => {
        const ignore_keys = results[sites] as unknown as string[];
        if (decideThisSIte(ignore_keys, removeEvent))
            return;

        const store_keys = results[consts.store];
        if (!store_keys || !Array.isArray(store_keys)) {
            logger.warn('키 값들을 담아놓는 그릇이 정상적으로 존재하지 않습니다. 새로 제작합니다.');

            await setInitialGesture();
            setCommand(removeEvent);
            return;
        }

        const filtered_keys = store_keys.filter((r) => typeof r == 'string');

        chrome.storage[storage_area].get(filtered_keys).then(result => {
            filtered_keys.forEach(key => {
                variable.command_store.set(key, result[key] as Gesture);
            });
        });
    });
}

export function decideThisSIte(ignore_keys: string[], removeEvent: Function) {
    if (ignore_keys && Array.isArray(ignore_keys)) {
        if (ignore_keys.includes(location.hostname)) {
            removeEvent();
            exitReset();
            return true;
        }
    }

    return false;
}

function gestureScript(script_key: string) {
    const result = scripts[script_key as keyof typeof scripts];
    if (!result) return logger.warn(script_key, '→ 본 확장프로그램이 지닌 스크립트 중에 이러한 것은 존재하지 않습니다.');

    // logger.log(result);

    try {
        result.script();
    } catch (error) {
        logger.error(result.key, error);
    }
}

function gestureCustomScript(custom_script: string) {
    const message: RepeaterMessage = {
        credit: credits.custom_script_message,
        script: custom_script,
        data: null
    }

    window.dispatchEvent(new CustomEvent(repeater_msg_event, { detail: JSON.stringify(message) }));
}
