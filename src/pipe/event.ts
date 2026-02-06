import { initial } from "src/main/consts";

export const pipe_event = {
    mousedown: `${initial}-mousedown`,
    mouseup: `${initial}-mouseup`,
    mousemove: `${initial}-mousemove`
}

export const pipe_gen_msg_event = `${initial}-generation-event-data`;

export const pipe_msg_event = `${initial}-mouse-event-data`;

export const pipe_cm_msg_event = `${initial}-context-menu-data`;
export const pipe_cm_event = {
    ignore: 'contextmenu-ignore',
    acknowledge: 'contextmenu-acknowledge'
}
