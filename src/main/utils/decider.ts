import { variable } from "src/main/variable";
import { calcAngleDegrees } from "./utils";
import { direction } from "../direction";


export function decideDir(event: MouseEvent | PipeCustomEvent): direction {
    
    const triangle: CoordinateObj = {
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

export function measureDistanceSq(event: MouseEvent | PipeCustomEvent): number {

    const current_pos: CoordinateObj = {
        x: event.clientX,
        y: event.clientY, 
    }

    const distance_sq = (variable.position.x - current_pos.x)**2 + (variable.position.y - current_pos.y)**2;

    return distance_sq;
}
