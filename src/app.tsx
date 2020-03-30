import React, { useState, useCallback } from 'react';

import Start from './components/start';
import Player from './components/player';

type State = { page: 'start' | 'player', data?: { id: string, pin: string } };

function App() {

    const [route, setRoute] = useState<State>({ page: 'start' });

    const toStart = useCallback(() => {
        setRoute({ page: 'start' });
    }, []);

    const toRoom = useCallback((id: string, pin: string) => {
        setRoute({ page: 'player', data: { id, pin } });
    }, []);

    if (route.page === 'player' && route.data && route.data.id && route.data.pin) {
        return <Player roomId={route.data.id} pin={route.data.pin} onExit={toStart} />
    } else {
        return <Start toRoom={toRoom} />;
    }

}

export default App;
