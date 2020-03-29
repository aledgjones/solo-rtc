import React, { FC, useState, useMemo } from 'react';
import { mdiAlertBox } from '@mdi/js';

import { InputProps } from '.';

import { merge } from '../../utils/merge';
import { Icon } from '../icon';

import './input-base.css';

export interface InputBaseProps extends InputProps {
    spellcheck: boolean;
    validate: (value: string) => string | null;
}

export const InputBase: FC<InputBaseProps> = ({ id, className, style, type, value, label, required, color, errorColor, disabled, spellcheck, validate, onChange }) => {

    const [focus, setFocus] = useState<boolean>(false);
    const [touched, setTouched] = useState(false);
    const error = touched ? validate(value) : null;
    const hasValue = value !== undefined && value !== null && value !== '';

    const highlight = useMemo(() => {
        if (disabled) {
            return undefined;
        }
        if (error) {
            return errorColor
        };
        if (focus) {
            return color;
        }
        return undefined;
    }, [disabled, error, focus, color, errorColor])

    return <div className="ui-input__container">
        {label && <p style={{ color: highlight }} className={merge("ui-input__label", { 'ui-input__label--float': focus || hasValue })}>{label}{required && '*'}</p>}
        <div
            id={id}
            className={merge('ui-input', { 'ui-input--disabled': disabled }, className)}
            style={{ border: highlight ? `1px solid ${highlight}` : undefined, ...style }}
        >
            <input
                className="ui-input__display"
                type={type === 'password' ? 'password' : 'text'}
                value={value}
                spellCheck={spellcheck}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    setFocus(false);
                    setTouched(true);
                }}
            />
            {error && !disabled && <Icon className="ui-input__error-icon" path={mdiAlertBox} color={errorColor} size={24} />}
        </div>
        {error && !disabled && <p style={{ color: errorColor }} className="ui-input__error-text">{error}</p>}
    </div>;
}