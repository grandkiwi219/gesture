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

type ContentMessage = SitesMessage | OptionsMessage | CommandsMessage | null;
