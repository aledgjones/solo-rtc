import React, { FC, CSSProperties } from 'react';
import { merge } from '../../utils/merge';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const Form: FC<Props> = ({ id, className, style, children }) => {
    return <form
        id={id}
        className={merge('ui-form', className)}
        style={style}
        onSubmit={e => e.preventDefault()}
    >
        {children}
    </form>;
}