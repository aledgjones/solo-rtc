import React, { FC } from "react";
import { THEME } from "../../const";
import { merge } from "../../ui/utils/merge";

import './styles.css';

interface Props {
    selected: boolean;
    onClick: () => void;
}

const Tab: FC<Props> = ({ selected, onClick, children }) => {
    return <p
        style={{
            borderBottom: `4px solid ${selected ? THEME.PRIMARY : 'transparent'}`,
            color: selected ? THEME.PRIMARY : undefined
        }}
        className={merge('tab', { 'tab--selected': selected })}
        onClick={onClick}
    >{children}</p>
}

export default Tab;