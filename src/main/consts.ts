import { initial_options } from "service/initial_options";
import packages from "../../package.json" with { type: 'json' };

export const initial: string = packages.name;

export const start_range: number = 3;
export const decide_range: number = 20;

export const storage_area: chrome.storage.AreaName = 'local';

export const storage_keys = {
    store: 'store',
    sites: 'sites',
    options: 'options'
}

export const drawing_elements: {
    [key: string]: {
        tag: string,
        style?: React.CSSProperties
    }
} = {
    main: {
        tag: `${initial}-paper`,
        style: {
            top: 0,
            left: 0,
            display: 'block',
            userSelect: 'none',
            zIndex: 99990,
            overflow: 'hidden'
        }
    },
    paper: {
        tag: 'canvas',
        style: {
            padding: '0',
            margin: '0',
            position: 'absolute',
            top: '0',
            left: '0',
            overflow: 'hidden'
        }
    },
    command: {
        tag: 'div',
        style: {
            padding: '0',
            borderRadius: '30px',
            backgroundColor: '#0000004b',
            textAlign: 'center',
            zIndex: 99999,
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
        }
    },
    command_img: {
        tag: 'img',
        style: {
            height: '50%',
            filter: 'drop-shadow(0 0 10px white)'
        }
    },
    command_text: {
        tag: 'div',
        style: {
            width: '100%',
            height: 'fit-content',
            display: 'block',
            color: 'white',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }
}

export default {
    initial,
    start_range,
    decide_range,
    storage_area,
    storage_keys,
    drawing_elements
}
