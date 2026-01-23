interface SitesMessage {
    credit: 'sites';
    data: Sites;
}

interface CommandsMessage {
    credit: 'commands';
    data: KeyObject<Gesture> | null
}

interface OptionsMessage {
    credit: 'options';
    data: Object;
}

interface ConsoleError {
    credit: 'console-error';
    data: ConsoleErrorData;
}

interface ConsoleErrorData {
    type?: 'alert';
    error: any;
}

type ContentMessage = SitesMessage | OptionsMessage | CommandsMessage | ConsoleError | null;
