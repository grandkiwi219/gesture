interface Coordinate {
    x: number;
    y: number;
}

type Angle = number;

type Direction = 'r' | 'l' | 'u' | 'd';

interface Script {
    key: string;
    description: string;
    script: function;
}
