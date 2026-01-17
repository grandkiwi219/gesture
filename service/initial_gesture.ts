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
        script: `(function() {
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

  const st = document.createElement('style');
  st.id = id;
  st.textContent=\`.show-alert {
    --alert-down: 20px;
    --alert-up: 10px;
    --box-shadow: 0px 0px 8px rgba(128, 128, 128, 0.7);
    --background-color: #0f0f0f;
    --background-color-hover: #6464644b;

    max-width: 90vw;
    width: fit-content;
    height: fit-content;

    padding: 12px 15px;
    border-radius: 40px;

    border: 2.5px solid var(--background-color-hover);
    background-color: var(--background-color);
    color: white;

    box-shadow: 0px 0px 2px rgba(128, 128, 128, 0.7);

    position: fixed;
    top: 0px;
    left: 50%;

    opacity: 0;

    font-size: 14px;
    text-align: center;
    word-break: keep-all;

    user-select: none;

    transform: translateX(-50%) translateY(-50%);
    transition: opacity .2s, top 0.4s ease-out, transform 0.4s ease-in-out;

    z-index: 100000;
}

.show-alert.show {
    opacity: 1;
    transform: translateX(-50%);
}

.show-alert.down {
    top: calc(30px + var(--alert-down));
}

.show-alert.up {
    top: calc(30px + var(--alert-down) - var(--alert-up));
}

.show-alert.error {
    color: #fff;
    border-color: rgb(196, 0, 0);
    background-color: rgb(255, 55, 55);
    box-shadow: var(--box-shadow);
}

.show-alert.warn {
    color: #fff;
    border-color: rgb(179, 101, 1);
    background-color: rgb(255, 177, 31);
    box-shadow: var(--box-shadow);
}

.show-alert.dev {
    color: #fff;
    border-color: rgb(0, 52, 196);
    background-color: rgb(48, 103, 255);
    box-shadow: var(--box-shadow);
}\`;
  if (!document.getElementById(id))  {
    document.head.appendChild(st);
  }
  
  showAlert({ msg: '상자에욧!' });
})();`,
        gesturePainting: [bg_consts.size.svg, [140, 140], [140, 500], [500, 500], [500, 140], [140, 140]],
    }
};

export default initial_gesture;
