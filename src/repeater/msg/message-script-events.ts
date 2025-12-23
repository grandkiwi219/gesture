import { scripts } from "src/main/scripts";
import logger from "src/main/utils/logger";

export function scriptMessageRun(script: string, use: boolean) {
    if (!use || typeof use != 'boolean') return;

    const result_key = Object.keys(scripts).find(r => r == script);

    if (!result_key) return;

    const result_script = scripts[result_key as keyof typeof scripts];

    try {
        result_script?.script();
    } catch (error) {
        logger.error(error);
    }
}
