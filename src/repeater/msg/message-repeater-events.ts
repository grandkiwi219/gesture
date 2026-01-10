import { initial } from "src/main/consts";
import logger from "src/main/utils/logger";

/* let ignore_context_menu = false;

export async function contextMenuEvent(event: PointerEvent) {
    if (!ignore_context_menu) {
       return;
    }

    event.preventDefault();
    event.stopPropagation();
}

export function ignoreContextMenu(data: boolean) {
    ignore_context_menu = data;
} */

export function executeCustomScript(data_script: string) {
    // @ts-ignore
    const gestureTrustedScript = trustedTypes.createPolicy(`${initial}TrustedScript`, {
        // @ts-ignore
        createScript: (string) => 
`
(function() {
${string.replace(/Function|eval|constructor./g, '')}
})();
`,
    });

    const script = document.createElement('script');
    script.textContent = gestureTrustedScript!.createScript(data_script) as unknown as string;
    const target = document.head || document.documentElement;
    target.appendChild(script);
}
