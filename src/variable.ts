import { DirectionBundle } from "./frame/Direction";

let starting: boolean = false;
let executing: boolean = false;
let position: Coordinate = {
    x: 0,
    y: 0
}
let directions = new DirectionBundle();

let command_store: Map<string, Gesture> = new Map();

export const variable = {
    starting,
    executing,
    position,
    directions,
    command_store
}
