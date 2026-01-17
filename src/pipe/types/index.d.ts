interface PipeCustomEvent {
    isTrusted: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
}

interface PipeMsgEvent {
    credit: string;
    event: string;
    detail?: PipeCustomEvent;
}
