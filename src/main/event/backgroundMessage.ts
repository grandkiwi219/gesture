import utils from "page/utils/utils";
import logger from "../utils/logger";

export function backgroundMessage(msg: ContentMessage, sender: chrome.runtime.MessageSender, sendResponse: ((response?: any) => void)) {
    switch (msg?.credit) {
        case 'console-error': {
            logger.error(msg.data.error);

            switch (msg.data.type) {
                case 'alert': {
                    utils.showAlert({ msg: msg.data.error, type: 'error' });
                }
            }
            return;
        }

        default: return;
    }
}