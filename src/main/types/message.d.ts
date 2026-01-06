interface SitesMessage {
    credit: 'sites';
    data: Sites;
}

interface CommandsMessage {
    credit: 'commands';
    data: KeyObject<Gesture> | null
}

type ContentMessage = SitesMessage | CommandsMessage | null;
