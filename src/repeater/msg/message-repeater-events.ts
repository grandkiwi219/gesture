import logger from "src/main/utils/logger";

let ignore_context_menu = true;

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

export function executeCustomScript(data_script: string) {
    const script = document.createElement('script');
    script.textContent = data_script;
    const target = document.head || document.documentElement;
    target.appendChild(script);
}
