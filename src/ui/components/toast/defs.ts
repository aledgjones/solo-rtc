import shortid from "shortid";

export interface ToastConfig {
    text: string;
    button?: string;
    duration?: number;
    onClick?: () => void;
    onTimeout?: () => void;
}

export interface ToastInstance extends ToastConfig {
    key: string;
}

export function createToastInstance({ text, button, duration = 4000, onClick, onTimeout }: ToastConfig): ToastInstance {
    return {
        key: shortid(),
        text,
        button,
        duration,
        onClick,
        onTimeout
    }
}