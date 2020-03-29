import React, { CSSProperties, FC, ReactNode } from 'react';

import { Portal } from '../../utils/portal';
import { Backdrop } from '../backdrop';
import { merge } from '../../utils/merge';
import { useDelayBoolean } from '../../utils/delay-boolean';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    width: number;

    open: boolean;
    onClose: () => void;
    children: () => ReactNode;
}

export const BottomSheet: FC<Props> = ({ id, className, style, width, open, onClose, children }) => {

    const render = useDelayBoolean(open, 500);

    return <Portal>
        <Backdrop open={open} onClick={onClose} />
        <div
            id={id}
            className={merge("ui-bottom-sheet", className)}
            style={{
                maxWidth: width,
                maxHeight: '100vh', // TO DO expanded state uses this
                overflow: 'auto',
                transform: open ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
                ...style
            }}
        >
            {render && children()}
        </div>
    </ Portal>;
}