export class DirectionBundle {
    private bundle: Direction[] = [];

    push(direction: Direction): boolean {
        if (this.bundle.at(-1) == direction) {
            return false;
        }
        else {
            this.bundle.push(direction);
            return true;
        }
    }

    reset() {
        this.bundle = []; 
    }

    get data() {
        const data = this.bundle;
        return data;
    }
}

export default {
    DirectionBundle
}
