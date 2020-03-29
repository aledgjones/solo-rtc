import React, { CSSProperties, FC, useState, useMemo, useCallback } from 'react';
import { mdiAlertBox } from '@mdi/js';

import { merge } from '../../utils/merge';
import { Icon } from '../icon';

import '../input/input-base.css';
import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    color: string;
    errorColor: string;

    value: any;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    spellcheck?: boolean

    onChange: (value: any) => void;
}

export const Textarea: FC<Props> = ({ id, className, style, value, label, required, color, errorColor, disabled, spellcheck, onChange }) => {

    const validate = useCallback((value: string) => {
        if (required && value === '') {
            return 'Required';
        } else {
            return null;
        }
    }, [required]);

    const [focus, setFocus] = useState<boolean>(false);
    const [touched, setTouched] = useState(false);
    const error = touched ? validate(value) : null;
    const hasValue = value !== undefined && value !== null && value !== '';

    const highlight = useMemo(() => {
        if (error) {
            return errorColor
        };
        if (focus) {
            return color;
        }
        return undefined;
    }, [error, focus, color, errorColor])

    return <div className="ui-input__container">
        {label && <p style={{ color: highlight }} className={merge("ui-input__label", {'ui-input__label--float': focus || hasValue})}>{label}{required && '*'}</p>}
        <div
            id={id}
            className={merge('ui-input', { 'ui-input--disabled': disabled }, className)}
            style={{ border: highlight ? `1px solid ${highlight}` : undefined, ...style }}
        >
            <textarea
                className="ui-input__display ui-textarea__display"
                value={value}
                spellCheck={spellcheck}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    setFocus(false);
                    setTouched(true);
                }}
            />
            <div className="ui-input__display ui-textarea__slave">{value}{'\n'}</div>
            {error && <Icon className="ui-input__error-icon" style={{ marginRight: 8 }} path={mdiAlertBox} color={errorColor} size={24} />}
        </div>
        {error && <p style={{ color: errorColor }} className="ui-input__error-text">{error}</p>}
    </div>;
}