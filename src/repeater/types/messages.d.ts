interface RepeaterMessage {
    credit: string;
    script: string;
    data: any;
}

interface RepeaterMessageWrapper {
    event: string;
    detail: RepeaterMessage;
}
