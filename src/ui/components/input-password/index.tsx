import React, { FC, useCallback } from 'react';

import { InputProps } from '../input';
import { InputBase } from '../input/input-base';

export const InputPassword: FC<InputProps> = ({ required, ...props }) => {

    const validate = useCallback((value: string) => {
        if (required && value === '') {
            return 'Required';
        } else {
            return null;
        }
    }, [required]);

    return <InputBase {...props} required={required} spellcheck={false} validate={validate} />;
}   