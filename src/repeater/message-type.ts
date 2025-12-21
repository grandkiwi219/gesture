import { initial } from "src/main/consts";

const ignore_context_menu: Message = {
    credit: `${initial}-ignore-context-menu`,
    script: '',
    data: null
}

const acknowledge_context_menu: Message = {
    credit: `${initial}-acknowledge-context-menu`,
    script: '',
    data: null
}

export const messages = {
    ignore_context_menu,
    acknowledge_context_menu
}


const script_message = `${initial}-script`;

export const credits = {
    script_message
}
