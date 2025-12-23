import packages from "../../package.json" with { type: 'json' };

export const initial: string = packages.name;

export const start_range: number = 3;
export const decide_range: number = 20;

export enum direction {
    Right = 'r',
    Left = 'l',
    Up = 'u',
    Down = 'd'
}

export const direction_regex = /^[rlud]+$/;

export const storage_area: chrome.storage.AreaName = 'local';

export const store = 'store';
export const sites = 'sites';

const command_size = 150;
export const drawing_elements: {
    [key: string]: {
        tag: string,
        style?: {},
        pen?: any
    }
} = {
    main: {
        tag: `${initial}-paper`
    },
    paper: {
        tag: 'canvas',
        style: {
            padding: '0',
            margin: '0',
            position: 'fixed',
            top: '0',
            left: '0',
            overflow: 'hidden'
        }
    },
    command: {
        tag: 'div',
        style: {
            width: `${command_size}px`,
            height: `${command_size}px`,
            padding: '0',
            borderRadius: '30px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0000004b',
            textAlign: 'center',
            zIndex: '99999',
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    command_canvas: {
        tag: 'canvas',
        style: {
            width: '100%',
            height: '50%',
            display: 'block'
        }
    },
    command_text: {
        tag: 'div',
        style: {
            width: '100%',
            height: 'fit-content',
            display: 'block',
            color: 'white',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }
}

export const drawing_options = {
    pen: {
        size: 4,
        color: 'rgba(199, 199, 199, 1)'
    }
}

export default {
    initial,
    start_range,
    decide_range,
    direction,
    direction_regex,
    storage_area,
    store,
    sites,
    drawing_elements,
    drawing_options
}
