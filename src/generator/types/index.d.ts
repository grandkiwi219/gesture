interface GesCustomEvent {
    isTrusted: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
}

interface GenMsgEvent {
    credit: string;
    event: string;
    detail?: GesCustomEvent;
}
