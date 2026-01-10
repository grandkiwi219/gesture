
export class Coordinate {

    public x: number;
    public y: number;

    constructor(x: number = NaN, y: number = NaN) {
        this.x = x;
        this.y = y;
    }

    get(): CoordinateObj {
        return {
            x: this.x,
            y: this.y
        }
    }

    set(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    override(coord: Coordinate | CoordinateObj) {
        this.x = coord.x;
        this.y = coord.y;
    }

    reset(): void {
        this.x = NaN;
        this.y = NaN;
    }
}
