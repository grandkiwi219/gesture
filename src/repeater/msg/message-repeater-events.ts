import { initial } from "src/main/consts";
import logger from "src/main/utils/logger";
import { trustedTypes } from "trusted-types";

let ignore_context_menu = false;

export async function contextMenuEvent(event: PointerEvent) {
    if (!ignore_context_menu) {
       return;
    }

    event.preventDefault();
    event.stopPropagation();
}

export function ignoreContextMenu(data: boolean) {
    ignore_context_menu = data;
}

/* export function executeCustomScript(data_script: string) {
    const TrustedScript = trustedTypes.createPolicy(`${initial}TrustedScript`, {
        createScript: (string) => string.replace(/Function|eval|constructor./g, ''),
    });


    const script = document.createElement('script');
    script.textContent = TrustedScript.createScript(data_script).toString();
    const target = document.head || document.documentElement;
    target.appendChild(script);
} */

export function executeCustomScript(data_script: string) {
    let sanitizedScript: string;

    if (window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function') {
        const policyName = `${initial}TrustedScript`;

        const TrustedScript = window.trustedTypes.defaultPolicy ||
            window.trustedTypes.createPolicy(policyName, {
                createScript: (s: string) => s.replace(/Function|eval|constructor./g, ''),
            });

        sanitizedScript = TrustedScript.createScript(data_script).toString();
    } else {
        sanitizedScript = data_script.replace(/Function|eval|constructor./g, '');
    }

    const script = document.createElement('script');
    script.textContent = sanitizedScript;
    const target = document.head || document.documentElement;
    target.appendChild(script);

    if (script.parentNode) {
        script.parentNode.removeChild(script);
    }
}
