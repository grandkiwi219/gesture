import { DirectionBundle } from "./frame/Direction";

let main_running: boolean = false;

let starting: boolean = false;
let executing: boolean = false;

let position: Coordinate = {
    x: -1,
    y: -1
}
let initial_pos: Coordinate = {
    x: -1,
    y: -1
}
let last_pos: Coordinate = {
    x: -1,
    y: -1
}

let directions = new DirectionBundle();

let command_store: Map<string, Gesture> = new Map();

let drawing_store: Drawing = {
    target: null,
    main: null,
    paper: null,
    command: null,
    command_canvas: null,
    command_text: null
};

export const variable = {
    main_running,
    starting,
    executing,
    position,
    initial_pos,
    last_pos,
    directions,
    command_store,
    drawing_store
}
