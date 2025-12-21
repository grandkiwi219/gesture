interface Gesture {
    description: string,
    type: string,
    script: string
}

interface BgMsg {
    type: 'tabs' | 'windows';
    state: string;
}
