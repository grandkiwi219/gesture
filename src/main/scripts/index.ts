import { variable } from "src/main/variable";
import { excludePaper, findScrollable } from "./supports";
import { messages } from "service/msg/message-types";
import { direction } from "../consts";


export const scripts = {
    /* page */

    next_page: {
        key: 'next_page',
        description: '다음 페이지',
        script: function() {
            history.forward();
        }
    },

    previous_page: {
        key: 'previous_page',
        description: '이전 페이지',
        script: function() {
            history.back();
        }
    },

    /* scroll */

    go_to_up: {
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
    },

    go_to_down: {
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
    },

    /* tab */

    close_tab: {
        key: 'close_tab',
        description: '탭 닫기',
        script: async function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'remove'
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    refresh_tab: {
        key: 'refresh_tab',
        description: '새로고침',
        script: function() {
            location.reload();
        }
    },

    restore_tab: {
        key: 'restore_tab',
        description: '최근 탭 복원',
        script: function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'restore'
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    focus_left_tab: {
        key: 'focus_left_tab',
        description: '왼쪽 탭으로 이동',
        script: function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'focus',
                data: {
                    direction: 'left',
                    pages: 1
                }
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    focus_right_tab: {
        key: 'focus_right_tab',
        description: '오른쪽 탭으로 이동',
        script: function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'focus',
                data: {
                    direction: 'right',
                    pages: 1
                }
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    move_left_tab: {
        key: 'move_left_tab',
        description: '탭을 왼쪽으로 이동',
        script: function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'move',
                data: -1
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    move_right_tab: {
        key: 'move_right_tab',
        description: '탭을 오른쪽으로 이동',
        script: function() {
            const msg: BgMsg = {
                type: messages.tabs,
                state: 'move',
                data: 1
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    /* window */

    minimized_window: {
        key: 'minimized_window',
        description: '창 최소화',
        script: function() {
            const msg: BgMsg = {
                type: messages.windows,
                state: 'minimized'
            }
            chrome.runtime.sendMessage(msg);
        }
},

    maximized_window: {
        key: 'maximized_window',
        description: '창 최대화',
        script: function() {
            const msg: BgMsg = {
                type: messages.windows,
                state: 'maximized'
            }
            chrome.runtime.sendMessage(msg);
        }
    },

    fullscreen_window: {
        key: 'fullscreen_window',
        description: '전체화면',
        script: function() {
            const msg: BgMsg = {
                type: messages.windows,
                state: 'fullscreen'
            }
            chrome.runtime.sendMessage(msg);
        }
    },

} satisfies Record<string, Script>;
