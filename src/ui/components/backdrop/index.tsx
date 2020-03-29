import React, { CSSProperties } from 'react';

import { merge } from '../../utils/merge';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    open: boolean;
    transparent?: boolean;
    onClick?: () => void;
}

export const Backdrop: React.FC<Props> = ({ id, className, open, transparent, onClick, children }) => {
    return <div
        id={id}
        className={merge('ui-backdrop', className, { 'ui-backdrop--visible': open, 'ui-backdrop--transparent': transparent })}
        onClick={onClick}
    >
        {children}
    </div>
}