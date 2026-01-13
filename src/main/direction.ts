
export enum direction {
    Right = 'r',
    Left = 'l',
    Up = 'u',
    Down = 'd',
}

export enum directionDiagonal {
    Right_Up = 'RU',
    Right_Down = 'RD',
    Left_Up = 'LU',
    Left_Down = 'LD'
}

export const regex = {
    direction: /^[rlud]+$/,
    directionDiagonal: new RegExp(`^(?:${Object.values(directionDiagonal).join('|')})+$`),
    directionAll: new RegExp(`^(?:${Object.values(directionDiagonal).join('|')+Object.values(direction).join('|')})+$`),
    host: /(?<=:\/\/)[^\/:]+/,
    hostname: /(?<=:\/\/)[^\/]+/
}
