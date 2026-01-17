import { Coordinate } from "./frame/Coordinate";
import { DirectionBundle } from "./frame/Direction";

const drawing_store: Drawing = {
    target: null,
    main: null,
    paper: null,
    command: null,
    command_img: null,
    command_text: null,
    target_is_window: false,
    preserve: true, // 타겟의 크기가 변경시 종이에 그린 그림을 지울지 말지
};

export const variable = {
    main_running: false,

    starting: false,
    executing: false,

    position: new Coordinate(),
    initial_pos: new Coordinate(),
    last_pos: new Coordinate(),
    changed_pos: new Coordinate(),

    directions: new DirectionBundle(),

    command_store: new Map() as CommandStore,
    drawing_store,
    
    mouseMove: null as null | ((ev: MouseEvent | PipeCustomEvent) => any) | ((ev: PipeCustomEvent) => any) | ((ev: MouseEvent) => any),
}
