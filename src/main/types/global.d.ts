interface Coordinate {
    x: number;
    y: number;
}

type Direction = 'r' | 'l' | 'u' | 'd';

type Angle = number;

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
    command_canvas: Element | null;
    command_text: Element | null;
}

interface MouseExit {
    run?: boolean
}
