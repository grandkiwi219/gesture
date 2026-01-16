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

    [GestureCmdPosition.Top]: {
        top: px(cmd_position_padding),
        left: '50%',
        transform: 'translateX(-50%)'
    },

    [GestureCmdPosition.TopRight]: {
        top: px(cmd_position_padding),
        right: px(cmd_position_padding)
    },

    [GestureCmdPosition.Right]: {
        top: '50%',
        right: px(cmd_position_padding),
        transform: 'translateY(-50%)'
    },

    [GestureCmdPosition.BottomRight]: {
        bottom: px(cmd_position_padding),
        right: px(cmd_position_padding)
    },

    [GestureCmdPosition.Bottom]: {
        bottom: px(cmd_position_padding),
        left: '50%',
        transform: 'translateX(-50%)'
    },

    [GestureCmdPosition.BottomLeft]: {
        bottom: px(cmd_position_padding),
        left: px(cmd_position_padding)
    },

    [GestureCmdPosition.Left]: {
        top: '50%',
        left: px(cmd_position_padding),
        transform: 'translateY(-50%)'
    }
}

export const options: typeof initial_options = JSON.parse(JSON.stringify(initial_options));
