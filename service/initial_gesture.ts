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

import { gesture_type } from './consts';
import scripts from 'src/scripts';

const r: Gesture = {
    description: scripts.next_page.description,
    type: gesture_type.script,
    script: scripts.next_page.key
}

const l: Gesture = {
    description: scripts.previous_page.description,
    type: gesture_type.script,
    script: scripts.previous_page.key
}

const u: Gesture = {
    description: scripts.go_to_up.description,
    type: gesture_type.script,
    script: scripts.go_to_up.key
}

const d: Gesture = {
    description: scripts.go_to_down.description,
    type: gesture_type.script,
    script: scripts.go_to_down.key
}

const dr: Gesture = {
    description: scripts.close_tap.description,
    type: gesture_type.script,
    script: scripts.close_tap.key
}

const rd: Gesture = {
    description: scripts.minimize_window.description,
    type: gesture_type.script,
    script: scripts.minimize_window.key
}

const ud: Gesture = {
    description: scripts.refresh.description,
    type: gesture_type.script,
    script: scripts.refresh.key
}

const du: Gesture = {
    description: scripts.refresh.description,
    type: gesture_type.script,
    script: scripts.refresh.key
}

export default {
    r, l, u, d, dr, rd, ud, du
}