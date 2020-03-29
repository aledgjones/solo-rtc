import React, { FC, useCallback } from 'react';

import { isEmail } from '../../utils/is-email';

import { InputProps } from '../input';
import { InputBase } from '../input/input-base';

export const InputEmail: FC<InputProps> = ({ required, ...props }) => {

    const validate = useCallback((value: string) => {
        if (required && value === '') {
            return 'Required';
        } else if (!isEmail(value)) {
            return 'Email invalid';
        } else {
            return null;
        }
    }, [required]);

    return <InputBase {...props} required={required} spellcheck={false} validate={validate} />;
}