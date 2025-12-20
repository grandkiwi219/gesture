import { variable } from "src/variable";

export function decidePos(event: MouseEvent) {

    variable.position = {
        x: event.clientX,
        y: event.clientY,
    }
}

export function decideDir(event: MouseEvent): Direction {
    
    const triangle: Coordinate = {
        x: event.clientX - variable.position.x,
        y: variable.position.y - event.clientY
    }

    const degree = calcAngleDegrees(triangle);

    if ($(-45, 45)) {
       return 'r'; 
    }
    else if ($(45, 135)) {
        return 'u';
    }
    else if ($(-135, -45)) {
        return 'd';
    }
    else {
        return 'l';
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

export function calcAngleDegrees({ x, y }: Coordinate): Angle {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

export default {
    decidePos,
    decideDir,
    measureDistanceSq,
    calcAngleDegrees,
};