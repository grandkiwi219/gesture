import { direction, directionDiagonal } from "./enum";

export default {
    direction: /^[rlud]+$/,
    directionDiagonal: new RegExp(`^(?:${Object.values(directionDiagonal).join('|')})+$`),
    directionAll: new RegExp(`^(?:${Object.values(directionDiagonal).join('|')+Object.values(direction).join('|')})+$`),
    host: /(?<=:\/\/)[^\/:]+/,
    hostname: /(?<=:\/\/)[^\/]+/
}