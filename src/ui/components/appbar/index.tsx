import React, { FC, CSSProperties } from 'react';
import { merge } from "../../utils/merge";

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    shadow?: boolean;
}

export const Appbar: FC<Props> = ({ id, className, style, shadow, children }) => {
    return <header
        id={id}
        className={merge('ui-appbar', { 'ui-appbar--shadow': shadow }, className)}
        style={style}
    >
        <div className="ui-appbar__content">
            {children}
        </div>
    </header>;
}