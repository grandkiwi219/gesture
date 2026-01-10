interface CoordinateObj {
    x: number;
    y: number;
}

type Angle = number;

type Sites = string[];

type CommandStore = Map<string, Gesture>;

interface KeyObject<V> {
    [key: string]: V
}

interface Script {
    key: string;
    description: string;
    script: function(...any?): void;
}

interface Drawing {
    target: Element | Window | null;
    main: Element | null;
    paper: Element | null;
    command: Element | null;
    command_img: Element | null;
    command_text: Element | null;
    target_is_window: boolean;
    preserve: boolean;
}

interface MouseExit {
    run?: boolean;
    reset_options?: ExitReset;
}

interface ExitReset {
    stop_drawing?: boolean;
    remove_mouse_move?: boolean;
    reset_directions?: boolean;
    execution?: (() => void);
}
