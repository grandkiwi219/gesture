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
        gesturePainting: '',
    },
    
    l: {
        description: scripts.previous_page.description,
        type: gesture_type.script,
        script: scripts.previous_page.key,
        gesturePainting: '',
    },

    u: {
        description: scripts.go_to_up.description,
        type: gesture_type.script,
        script: scripts.go_to_up.key,
        gesturePainting: '',
    },

    d: {
        description: scripts.go_to_down.description,
        type: gesture_type.script,
        script: scripts.go_to_down.key,
        gesturePainting: '',
    },

    dr: {
        description: scripts.close_tap.description,
        type: gesture_type.script,
        script: scripts.close_tap.key,
        gesturePainting: '',
    },

    rd: {
        description: scripts.minimized_window.description,
        type: gesture_type.script,
        script: scripts.minimized_window.key,
        gesturePainting: '',
    },

    ud: {
        description: scripts.refresh_tap.description,
        type: gesture_type.script,
        script: scripts.refresh_tap.key,
        gesturePainting: '',
    },

    du: {
        description: scripts.refresh_tap.description,
        type: gesture_type.script,
        script: scripts.refresh_tap.key,
        gesturePainting: '',
    },

    ru: {
        description: scripts.maximized_window.description,
        type: gesture_type.script,
        script: scripts.maximized_window.key,
        gesturePainting: '',
    },

    lu: {
        description: scripts.fullscreen_window.description,
        type: gesture_type.script,
        script: scripts.fullscreen_window.key,
        gesturePainting: '',
    },

    ld: {
        description: scripts.restore_tap.description,
        type: gesture_type.script,
        script: scripts.restore_tap.key,
        gesturePainting: '',
    },

    lr: {
        description: scripts.focus_left_tap.description,
        type: gesture_type.script,
        script: scripts.focus_left_tap.key,
        gesturePainting: '',
    },

    rl: {
        description: scripts.focus_right_tap.description,
        type: gesture_type.script,
        script: scripts.focus_right_tap.key,
        gesturePainting: '',
    },
};

export default initial_gesture;
