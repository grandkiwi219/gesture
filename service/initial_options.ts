
export enum GestureCmdPosition {
    Center = 'center',
    TopLeft = 'top-left',
    TopRight = 'top-right',
    BottomLeft = 'bottom-left',
    BottomRight = 'bottom-right'
}

export const initial_options = {
    pen: {
        size: 4,
        color: '#c7c7c7'
    },

    cmd: {
        visible: true,
        position: GestureCmdPosition.Center,
        rate: 100,
        painting: false
    },

    painting: {
        use: true
    }
}
