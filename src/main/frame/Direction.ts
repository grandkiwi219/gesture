import { direction } from "../consts";

export class DirectionBundle {
    private bundle: direction[] = [];

    push(direction: direction): boolean {
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
