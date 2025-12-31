type AlertType = 'error' | 'warn' | 'dev';

interface Alert {
    type?: AlertType;
    msg: string | undefined;
}

interface SettingGesture extends Gesture {
    type?: GestureType | null;
    script?: string | null;
}
