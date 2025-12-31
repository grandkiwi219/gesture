import { decideThisSIte, setCommand } from "../process";
import { variable } from "../variable";
import { encodeMap } from "../utils/utils";
import logger from "../utils/logger";

export function storageChanged(message: ContentMessage, addEvent?: Function, removeEvent?: Function) {
    switch (message.credit) {
        case 'sites':
            changeSites(message.data as Sites, addEvent, removeEvent);
            break;

        case 'commands':
            changeCommands(message.data as KeyObject<Gesture>);
            break;

        default:
            break;
    }
} 

export function changeSites(changed_sites: Sites, addEvent: Function | undefined, removeEvent: Function | undefined) {
    if (decideThisSIte(changed_sites, removeEvent))
        return;

    if (addEvent && !variable.main_running) {
        addEvent();
    }
}

export function changeCommands(changed_command_store: KeyObject<Gesture>) {
    variable.command_store.clear();
    setCommand();
    //variable.command_store = encodeMap<Gesture>(Object.keys(changed_command_store), changed_command_store as KeyObject<Gesture>);
}
