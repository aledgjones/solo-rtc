import React, { FC, CSSProperties } from 'react';

import { merge } from '../../utils/merge';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const Transition: FC<Props> = ({ id, className, style, children }) => {
    return <div
        id={id}
        className={merge('ui-transition', className)}
        style={style}
    >
        {children}
    </div>;
}