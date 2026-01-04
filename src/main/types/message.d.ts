interface SitesMessage {
    credit: 'sites';
    data: Sites;
}

interface CommandsMessage {
    credit: 'commands';
    data: KeyObject<Gesture>
}

type ContentMessage = SitesMessage | CommandsMessage | null;
