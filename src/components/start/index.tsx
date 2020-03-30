import React, { FC, useState, useCallback, useMemo } from 'react';

import { THEME, APP_VERSION } from '../../const';
import { Button } from '../../ui/components/button';
import Tab from '../tab';
import { useTheme } from '../../ui/utils/theme';

import './styles.css';

interface Props {
    toRoom: (id: string, pin: string) => void;
}

const Start: FC<Props> = ({ toRoom }) => {

    const search = useMemo(() => {
        const search = window.location.search.slice(1);
        const pairs = search.split('&');
        return pairs.reduce<{ [key: string]: string }>((output, pair) => {
            const [key, value] = pair.split('=');
            output[key] = value;
            return output;
        }, {});
    }, []);

    const [id, setId] = useState(search.roomId || '');
    const [pin, setPin] = useState(search.pin || '');
    const [page, setPage] = useState<'join' | 'host'>('join');

    const isId = /^\d{3}-\d{3}-\d{3}$/;
    const isPin = /^\d{6}$/;
    const valid = id && isId.test(id) && pin && isPin.test(pin);

    useTheme('rgb(50,50,50)');

    const toRoomCallback = useCallback(() => {
        if (valid) {
            toRoom(id, pin);
        }
    }, [toRoom, id, pin, valid]);

    const generateCreds = useCallback(() => {
        let _id = '';
        for (let i = 0; i < 9; i++) {
            const random = Math.floor(Math.random() * 10);
            _id += random;
            if (i !== 8 && i % 3 === 2) {
                _id += '-';
            }
        }

        let _pin = '';
        for (let i = 0; i < 6; i++) {
            const random = Math.floor(Math.random() * 10);
            _pin += random;
        }

        setId(_id);
        setPin(_pin);
    }, []);

    return <div className="start">

        <div className="start__form">

            <div className="start__tabs">

                <Tab selected={page === 'join'} onClick={() => {
                    setPage('join');
                    setId('');
                    setPin('');
                }}>Join</Tab>

                <Tab selected={page === 'host'} onClick={() => {
                    setPage('host');
                    generateCreds();
                }}>Host</Tab>

            </div>

            <div className="start__content">
                <p className="start__label">Meeting ID</p>
                <input autoFocus readOnly={page === 'host'} className="start__input" placeholder="XXX-XXX-XXX" value={id} onChange={e => setId(e.target.value)} />
                <p className="start__label">Pin</p>
                <input readOnly={page === 'host'} className="start__input" placeholder="XXXXXX" value={pin} onChange={e => setPin(e.target.value)} />
            </div>

            <div className="start__buttons">
                <Button disabled={!valid} color={THEME.PRIMARY} onClick={toRoomCallback}>Connect</Button>
            </div>

        </div>

        <p className="start__version">Version {APP_VERSION}</p>
    </div>;
}

export default Start;
