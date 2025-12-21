interface Coordinate {
    x: number;
    y: number;
}

type Angle = number;

type Direction = 'r' | 'l' | 'u' | 'd';

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
