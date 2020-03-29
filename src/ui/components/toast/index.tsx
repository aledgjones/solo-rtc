import React, { FC } from 'react';

import { ToastInstance } from './defs';
import { ToastEntry } from './toast-entry';

interface Props {
    color: string;
    toasts: ToastInstance[];
    onDestroy: (key: string) => void;
}

export const Toast: FC<Props> = ({ color, toasts, onDestroy }) => {
    return <>
        {toasts.map(toast => {
            return <ToastEntry key={toast.key} color={color} toast={toast} onDestroy={onDestroy} />;
        })}
    </>;
}