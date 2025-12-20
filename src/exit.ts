import { gesture_type } from "service/consts";
import logger from "./utils/logger";
import { variable } from "./variable";
import scripts from "./scripts/";

export function exit() {

    const result_command = variable.command_store.get(variable.directions.data.join(''));

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

    logger.log(variable.directions.data);
    logger.log(result_command);
    logger.log(variable.command_store);

    variable.directions.reset();
    variable.starting = false;
    variable.executing = false;
    variable.position = {
        x: 0,
        y: 0,
    }
}

function gestureScript(script_key: string) {
    const result = scripts[script_key as keyof typeof scripts];
    if (!result) return logger.warn(script_key, '→ 본 확장프로그램이 지닌 스크립트 중에 이러한 것은 존재하지 않습니다.', );

    logger.log(result);

    try {
        result.script();
    } catch (error) {
        logger.error(result.key, '→ Error:', error);
    }
}

function gestureCustomScript(script_key: string) {

}
