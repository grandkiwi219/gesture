export const initial: string = 'gesture';

export const start_range: number = 3;
export const decide_range: number = 20;

export enum direction {
    Right = 'r',
    Left = 'l',
    Up = 'u',
    Down = 'd'
}

export const store = 'store';
export const initial_store = `${initial}_${store}`;

export default {
    initial,
    start_range,
    decide_range,
    direction,
    store
}
