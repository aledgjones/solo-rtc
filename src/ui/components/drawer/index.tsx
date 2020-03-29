import React, { CSSProperties, FC, ReactNode } from 'react';

import { useDelayBoolean } from '../../utils/delay-boolean';
import { Portal } from '../../utils/portal';
import { merge } from '../../utils/merge';
import { Backdrop } from '../backdrop';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    width: number;
    open: boolean;

    // events may happen that closes/opens from within component
    onClose: () => void;
    children: () => ReactNode;
}

export const Drawer: FC<Props> = ({ id, className, style, children, open, width, onClose }) => {

    const render = useDelayBoolean(open, 500);

    return <Portal>
        <Backdrop open={open} onClick={onClose} />
        <div
            id={id}
            className={merge('ui-drawer', className)}
            style={{
                width,
                left: -width,
                transform: `translate3d(${open ? width : 0}px, 0, 0)`,
                ...style
            }}
        >
            {render && children()}
        </div>
    </Portal>;

}