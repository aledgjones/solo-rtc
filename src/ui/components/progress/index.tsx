import React, { CSSProperties, FC } from 'react';

import { merge } from '../../utils/merge';
import { useAlpha } from '../../utils/set-alpha';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    percent?: number;
    color: string;
    hidden?: boolean;
}

export const Progress: FC<Props> = ({ id, className, style, color, percent, hidden }) => {

    const bg = useAlpha(color, .2);;

    return <div
        id={id}
        className={merge(
            'ui-progress',
            {
                'ui-progress--indeterminate': percent === undefined,
                'ui-progress--hidden': hidden
            },
            className
        )}
        style={{
            backgroundColor: bg,
            ...style
        }}
    >
        <div
            className="ui-progress__indicator"
            style={{
                width: `${percent}%`,
                backgroundColor: color
            }}
        />
    </div>;
}