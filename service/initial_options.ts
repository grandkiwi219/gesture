
export enum GestureCmdPosition {
    Center = 'center',
    TopLeft = 'top-left',
    Top = 'top',
    TopRight = 'top-right',
    Right = 'right',
    BottomRight = 'bottom-right',
    Bottom = 'bottom',
    BottomLeft = 'bottom-left',
    Left = 'left'
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
    },

    range: {
        start: 3,
        decide: 20
    }
}
