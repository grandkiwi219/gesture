import { initial } from "src/main/consts";

/**
 * 입력한 파일 위치를 사이트 페이지에 삽입합니다
 * @param {string} path 파일 위치
 */
export async function scriptInjection(append_target: HTMLElement, path: string) {
    if (!path) return;

    const id = `${initial}-${path.split('/').pop()}`;

    const script = document.createElement('script');

    script.src = chrome.runtime.getURL(path);
    script.id = id;

    const check_target = document.getElementById(id);
    if (check_target)
        check_target.remove();

    append_target.appendChild(script);

    return script;
}
