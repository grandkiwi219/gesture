import { GestureCmdPosition, initial_options } from "service/initial_options";
import { px } from "./utils/utils";

export const cmd_size = 150;
export const cmd_font_size = 14;

const cmd_position_padding = 20;
export const cmd_position: { [key in GestureCmdPosition]: React.CSSProperties } = {
    [GestureCmdPosition.Center]: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    [GestureCmdPosition.TopLeft]: {
        top: px(cmd_position_padding),
        left: px(cmd_position_padding)
    },

    [GestureCmdPosition.TopRight]: {
        top: px(cmd_position_padding),
        right: px(cmd_position_padding)
    },

    [GestureCmdPosition.BottomLeft]: {
        bottom: px(cmd_position_padding),
        left: px(cmd_position_padding)
    },
    
    [GestureCmdPosition.BottomRight]: {
        bottom: px(cmd_position_padding),
        right: px(cmd_position_padding)
    }
}

export const options: typeof initial_options = JSON.parse(JSON.stringify(initial_options));
