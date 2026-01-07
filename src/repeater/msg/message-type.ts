import { initial } from "src/main/assets/consts";

export const repeater_msg_event = `${initial}-message-repeater`;
export const script_msg_event = `${initial}-message-script`;

const context_menu = `${initial}-context-menu`;
const script_message = `${initial}-script`;
const custom_script_message = `${initial}-custom-script`;
const mousedown_messages = `${initial}-mousedown`;

export const credits = {
    context_menu,
    script_message,
    custom_script_message,
    mousedown_messages
}



const ignore_context_menu: RepeaterMessage = {
    credit: context_menu,
    script: '',
    data: true
}

const acknowledge_context_menu: RepeaterMessage = {
    credit: context_menu,
    script: '',
    data: false
}

export const messages = {
    ignore_context_menu,
    acknowledge_context_menu
}
