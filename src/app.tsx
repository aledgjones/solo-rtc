import React, { useState, useCallback } from 'react';

import Start from './components/start';
import Player from './components/player';
import { Toast } from './ui/components/toast';
import { THEME } from './const';
import { ToastInstance, createToastInstance } from './ui/components/toast/defs';

type State = { page: 'start' | 'player', data?: { id: string, pin: string } };

function App() {

    const [route, setRoute] = useState<State>({ page: 'start' });
    const [toasts, setToasts] = useState<ToastInstance[]>([]);

    const toStart = useCallback(() => {
        setRoute({ page: 'start' });
    }, []);

    const toRoom = useCallback((id: string, pin: string) => {
        setRoute({ page: 'player', data: { id, pin } });
    }, []);

    const onToast = useCallback((text: string) => {
        setToasts(t => [...t, createToastInstance({ text })]);
    }, []);

    if (route.page === 'player' && route.data && route.data.id && route.data.pin) {
        return <>
            <Toast toasts={toasts} color={THEME.PRIMARY} onDestroy={key => setToasts(t => t.filter(toast => toast.key !== key))} />
            <Player roomId={route.data.id} pin={route.data.pin} onExit={toStart} onToast={onToast} />
        </>
    }

    return <Start toRoom={toRoom} />;

}

export default App;
