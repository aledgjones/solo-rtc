import React, { CSSProperties, FC } from 'react';

import './styles.css';
import { merge } from '../../utils/merge';
import { useAlpha } from '../../utils/set-alpha';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    value: boolean;
    disabled?: boolean;
    color: string;

    onChange?: (val: boolean) => void;
}

export const Switch: FC<Props> = ({ id, className, style, value, disabled, color, onChange }) => {

    const bg = useAlpha(color, .4);

    return <div
        id={id}
        className={merge('ui-switch', { 'ui-switch--active': value, 'ui-switch--disabled': disabled }, className)}
        style={style}
        onClick={() => onChange && onChange(!value)}
    >
        <div className="ui-switch__track" style={{ backgroundColor: value ? bg : undefined }} />
        <div className="ui-switch__button" style={{ backgroundColor: value ? color : undefined, left: value ? 19 : undefined }} />
    </div>;
}