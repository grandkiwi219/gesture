/* {
    "r": {
        "description": "다음 페이지"
    },
    "l": {
        "description": "이전 페이지"
    },
    "u": {
        "description": "맨 위로"
    },
    "d": {
        "description": "맨 아래로"
    },
    "dr": {
        "description": "탭 닫기"
    },
    "rd": {
        "description": "창 최소화"
    },
    "ud": {
        "description": "새로고침"
    },
    "du": {
        "description": "새로고침"
    }
} */

import { gesture_type } from "./consts";
import { scripts } from "src/main/scripts";

const initial_gesture: { [key: string]: Gesture } = {
    r: {
        description: scripts.next_page.description,
        type: gesture_type.script,
        script: scripts.next_page.key,
    },
    
    l: {
        description: scripts.previous_page.description,
        type: gesture_type.script,
        script: scripts.previous_page.key,
    },

    u: {
        description: scripts.go_to_up.description,
        type: gesture_type.script,
        script: scripts.go_to_up.key,
    },

    d: {
        description: scripts.go_to_down.description,
        type: gesture_type.script,
        script: scripts.go_to_down.key,
    },

    dr: {
        description: scripts.close_tap.description,
        type: gesture_type.script,
        script: scripts.close_tap.key,
    },

    rd: {
        description: scripts.minimized_window.description,
        type: gesture_type.script,
        script: scripts.minimized_window.key,
    },

    ud: {
        description: scripts.refresh_tap.description,
        type: gesture_type.script,
        script: scripts.refresh_tap.key,
    },

    du: {
        description: scripts.refresh_tap.description,
        type: gesture_type.script,
        script: scripts.refresh_tap.key,
    },

    ru: {
        description: scripts.maximized_window.description,
        type: gesture_type.script,
        script: scripts.maximized_window.key,
    },

    lu: {
        description: scripts.fullscreen_window.description,
        type: gesture_type.script,
        script: scripts.fullscreen_window.key,
    },

    ld: {
        description: scripts.restore_tap.description,
        type: gesture_type.script,
        script: scripts.restore_tap.key,
    },

    lr: {
        description: scripts.move_left_tap.description,
        type: gesture_type.script,
        script: scripts.move_left_tap.key,
    },

    rl: {
        description: scripts.move_right_tap.description,
        type: gesture_type.script,
        script: scripts.move_right_tap.key,
    },
};

export default initial_gesture;
