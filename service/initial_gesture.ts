import { bg_consts, gesture_type } from "./consts";
import { scripts } from "src/main/scripts";


const initial_gesture: { [key: string]: Gesture } = {
    r: {
        description: scripts.next_page.description,
        type: gesture_type.script,
        script: scripts.next_page.key,
        gesturePainting: [bg_consts.size.svg, [140, 320], [500, 320]],
    },
    
    l: {
        description: scripts.previous_page.description,
        type: gesture_type.script,
        script: scripts.previous_page.key,
        gesturePainting: [bg_consts.size.svg, [500, 320], [140, 320]],
    },

    u: {
        description: scripts.go_to_up.description,
        type: gesture_type.script,
        script: scripts.go_to_up.key,
        gesturePainting: [bg_consts.size.svg, [320, 500], [320, 140]],
    },

    d: {
        description: scripts.go_to_down.description,
        type: gesture_type.script,
        script: scripts.go_to_down.key,
        gesturePainting: [bg_consts.size.svg, [320, 140], [320, 500]],
    },

    ud: {
        description: scripts.refresh_tab.description,
        type: gesture_type.script,
        script: scripts.refresh_tab.key,
        gesturePainting: [bg_consts.size.svg, [220, 500], [320, 140], [420, 500]],
    },

    du: {
        description: scripts.refresh_tab.description,
        type: gesture_type.script,
        script: scripts.refresh_tab.key,
        gesturePainting: [bg_consts.size.svg, [220, 140], [320, 500], [420, 140]],
    },

    ul: {
        description: scripts.new_tab.description,
        type: gesture_type.script,
        script: scripts.new_tab.key,
        gesturePainting: [bg_consts.size.svg, [500, 500], [500, 140], [140, 140]],
    },

    ur: {
        description: scripts.new_window.description,
        type: gesture_type.script,
        script: scripts.new_window.key,
        gesturePainting: [bg_consts.size.svg, [140, 500], [140, 140], [500, 140]],
    },

    dl: {
        description: scripts.new_secret_window.description,
        type: gesture_type.script,
        script: scripts.new_secret_window.key,
        gesturePainting: [bg_consts.size.svg, [500, 140], [500, 500], [140, 500]],
    },

    dr: {
        description: scripts.close_tab.description,
        type: gesture_type.script,
        script: scripts.close_tab.key,
        gesturePainting: [bg_consts.size.svg, [140, 140], [140, 500], [500, 500]],
    },

    rd: {
        description: scripts.minimized_window.description,
        type: gesture_type.script,
        script: scripts.minimized_window.key,
        gesturePainting: [bg_consts.size.svg, [140, 140], [500, 140], [500, 500]],
    },

    ru: {
        description: scripts.maximized_window.description,
        type: gesture_type.script,
        script: scripts.maximized_window.key,
        gesturePainting: [bg_consts.size.svg, [140, 500], [500, 500], [500, 140]],
    },

    lu: {
        description: scripts.fullscreen_window.description,
        type: gesture_type.script,
        script: scripts.fullscreen_window.key,
        gesturePainting: [bg_consts.size.svg, [500, 500], [140, 500], [140, 140]],
    },

    ld: {
        description: scripts.restore_tab.description,
        type: gesture_type.script,
        script: scripts.restore_tab.key,
        gesturePainting: [bg_consts.size.svg, [500, 140], [140, 140], [140, 500]],
    },

    lr: {
        description: scripts.focus_left_tab.description,
        type: gesture_type.script,
        script: scripts.focus_left_tab.key,
        gesturePainting: [bg_consts.size.svg, [500, 220], [140, 320], [500, 420]],
    },

    rl: {
        description: scripts.focus_right_tab.description,
        type: gesture_type.script,
        script: scripts.focus_right_tab.key,
        gesturePainting: [bg_consts.size.svg, [140, 220], [500, 320], [140, 420]],
    },

    drul: {
        description: '상자에욧!',
        type: 'custom_script',
        script: `
async function setDelay(time) {
    return await new Promise(r => setTimeout(r, time));
}

async function showAlert({ type, msg = undefined }) {
    const alert = document.createElement('div');
    alert.classList.add('show-alert');
    if (type) alert.classList.add(type);
    alert.textContent = msg ?? '메세지가 할당되지 않았습니다.';

    document.body.appendChild(alert);

    await setDelay(100);
    alert.classList.add('show');
    alert.classList.add('down');
    await setDelay(400);
    alert.classList.add('up');
    await setDelay(2 * 1000);
    alert.classList.remove('show');
    await setDelay(200);
    alert.remove();

    return true;
}

  const id = 'gesture-im-box';
  
  showAlert({ msg: '상자에욧!' });
`,
        gesturePainting: [bg_consts.size.svg, [140, 140], [140, 500], [500, 500], [500, 140], [140, 140]],
    }
};

export default initial_gesture;
