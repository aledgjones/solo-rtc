import React, { FC, CSSProperties } from 'react';

import { InputEmail } from '../input-email';
import { InputText } from '../input-text';
import { InputPassword } from '../input-password';

export interface InputProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
    color: string;
    errorColor: string;

    type: 'text' | 'email' | 'password';
    value: any;
    label: string;
    required?: boolean;
    disabled?: boolean;

    onChange: (value: any) => void;
}

export const Input: FC<InputProps> = ({ type, ...props }) => {
    switch (type) {
        case 'email':
            return <InputEmail type={type} {...props} />;
        case 'password':
            return <InputPassword type={type} {...props} />;
        case 'text':
        default:
            return <InputText type={type} {...props} />;
    }
}