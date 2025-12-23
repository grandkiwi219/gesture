import { variable } from "src/main/variable";
import { excludePaper, findScrollable } from "./supports";
import { messages } from "service/msg/message-types";

const next_page: Script = {
    key: 'next_page',
    description: '다음 페이지',
    script: function() {
        history.forward();
    }
}

const previous_page: Script = {
    key: 'previous_page',
    description: '이전 페이지',
    script: function() {
        history.back();
    }
}

const go_to_up: Script = {
    key: 'go_to_up',
    description: '맨 위로',
    script: function() {
        const targets = document.elementsFromPoint(variable.initial_pos.x, variable.initial_pos.y);

        const target = targets.find(excludePaper) ?? null;

        let scrollable_el = findScrollable(target);

        scrollable_el.scroll({
            top: 0,
            behavior: 'instant'
        });
    }
}

const go_to_down: Script = {
    key: 'go_to_down',
    description: '맨 아래로',
    script: function() {
        const targets = document.elementsFromPoint(variable.initial_pos.x, variable.initial_pos.y);

        const target = targets.find(excludePaper) ?? null;

        let scrollable_el = findScrollable(target);

        scrollable_el.scroll({
            top: scrollable_el.scrollHeight,
            behavior: 'instant'
        });
    }
}

const close_tap: Script = {
    key: 'close_tap',
    description: '탭 닫기',
    script: async function() {
        const msg: BgMsg = {
            type: messages.tabs,
            state: 'remove'
        }
        chrome.runtime.sendMessage(msg);
    }
}

const refresh_tap: Script = {
    key: 'refresh_tap',
    description: '새로고침',
    script: function() {
        location.reload();
    }
}

const restore_tap: Script = {
    key: 'restore_tap',
    description: '최근 탭 복원',
    script: function() {
        const msg: BgMsg = {
            type: messages.tabs,
            state: 'restore'
        }
        chrome.runtime.sendMessage(msg);
    }
}

const move_left_tap: Script = {
    key: 'move_left_tap',
    description: '왼쪽 탭 이동',
    script: function() {
        const msg: BgMsg = {
            type: messages.tabs,
            state: 'move',
            data: -1
        }
        chrome.runtime.sendMessage(msg);
    }
}

const move_right_tap: Script = {
    key: 'move_right_tap',
    description: '왼쪽 탭 이동',
    script: function() {
        const msg: BgMsg = {
            type: messages.tabs,
            state: 'move',
            data: 1
        }
        chrome.runtime.sendMessage(msg);
    }
}

const minimized_window: Script = {
    key: 'minimized_window',
    description: '창 최소화',
    script: function() {
        const msg: BgMsg = {
            type: messages.windows,
            state: 'minimized'
        }
        chrome.runtime.sendMessage(msg);
    }
}

const maximized_window: Script = {
    key: 'maximized_window',
    description: '창 최대화',
    script: function() {
        const msg: BgMsg = {
            type: messages.windows,
            state: 'maximized'
        }
        chrome.runtime.sendMessage(msg);
    }
}

const fullscreen_window: Script = {
    key: 'fullscreen_window',
    description: '전체화면',
    script: function() {
        const msg: BgMsg = {
            type: messages.windows,
            state: 'fullscreen'
        }
        chrome.runtime.sendMessage(msg);
    }
}



export const scripts = {
    next_page,
    previous_page,

    go_to_up,
    go_to_down,

    close_tap,
    refresh_tap,
    restore_tap,
    move_left_tap,
    move_right_tap,

    minimized_window,
    maximized_window,
    fullscreen_window,
}
