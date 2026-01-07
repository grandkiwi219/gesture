import { variable } from "src/main/assets/variable";
import { calcAngleDegrees } from "./utils";
import { direction } from "../assets/enum";

export function decidePos({ x, y }: Coordinate) {

    variable.position = {
        x: x,
        y: y,
    }
}

export function decideDir(event: MouseEvent): direction {
    
    const triangle: Coordinate = {
        x: event.clientX - variable.position.x,
        y: variable.position.y - event.clientY
    }

    const degree = calcAngleDegrees(triangle);

    if ($(-45, 45)) {
       return direction.Right; 
    }
    else if ($(45, 135)) {
        return direction.Up;
    }
    else if ($(-135, -45)) {
        return direction.Down;
    }
    else {
        return direction.Left;
    }

    function $(angle1: Angle, angle2: Angle): boolean {
        return angle1 <= degree && degree < angle2;
    }
}

export function measureDistanceSq(event: MouseEvent): number {

    const current_pos: Coordinate = {
        x: event.clientX,
        y: event.clientY, 
    }

    const distance_sq = (variable.position.x - current_pos.x)**2 + (variable.position.y - current_pos.y)**2;

    return distance_sq;
}
