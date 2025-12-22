import { initial } from "src/main/consts";

export const repeater_msg_event = `${initial}-message-repeater`;
export const script_msg_event = `${initial}-message-script`;

const context_menu = `${initial}-context-menu`;
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


const script_message = `${initial}-script`;
const custom_script_message = `${initial}-custom-script`;

export const credits = {
    context_menu,
    script_message,
    custom_script_message
}
