export class DirectionBundle {
    _bundle: Direction[] = [];

    push(direction: Direction): boolean {
        if (this._bundle.at(-1) == direction) {
            return false;
        }
        else {
            this._bundle.push(direction);
            return true;
        }
    }

    reset() {
        this._bundle = []; 
    }

    get data() {
        const data = this._bundle;
        return data;
    }
}

export default {
    DirectionBundle
}
