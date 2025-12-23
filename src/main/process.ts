import { gesture_type } from "service/consts";
import logger from "./utils/logger";
import { variable } from "./variable";
import { scripts } from "./scripts";
import { stopDrawing } from "./drawing";
import { mouseMove } from "./event";

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

export function getCommandData() {
    return variable.command_store.get(variable.directions.data.join(''));
}

export function exitReset() {
    window.removeEventListener('mousemove', mouseMove);
    
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

    stopDrawing();
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

function gestureCustomScript(script_key: string) {

}
