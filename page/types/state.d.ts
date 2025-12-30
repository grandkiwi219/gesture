type AlertType = 'error' | 'warn' | 'dev';

interface Alert {
    type?: AlertType;
    msg: string | undefined;
}