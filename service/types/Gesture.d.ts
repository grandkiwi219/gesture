type GesturePainting = Array<number[]>;

type GestureType = 'script' | 'custom_script';

interface Gesture {
    gesturePainting?: GesturePainting;
    description: string;
    type: GestureType;
    script: string;
}

// type GestureCmdPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
