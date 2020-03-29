import React, { FC, CSSProperties, ReactNode } from 'react';

import { Portal } from '../../utils/portal';
import { merge } from '../../utils/merge';
import { Backdrop } from '../backdrop';
import { Card } from '../card';
import { useDelayBoolean } from '../../utils/delay-boolean';

import './styles.css';

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;

    width?: number;
    open: boolean;
    children: () => ReactNode;
}

export const Dialog: FC<Props> = ({ id, className, style, width, open, children }) => {

    const render = useDelayBoolean(open, 500);

    return <Portal>
        <Backdrop className={merge("ui-dialog", { 'ui-dialog--show': open })} open={open}>
            <div className="ui-dialog__scroller">
                <Card
                    className="ui-dialog__card"
                    style={{
                        maxWidth: width,
                        ...style
                    }}
                >
                    {render && children()}
                </Card>
            </div>
        </Backdrop>
    </Portal >;

}