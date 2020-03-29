import React, { useState, useCallback } from 'react';

import Start from './components/start';
import Player from './components/player';

function App() {

    const [route, setRoute] = useState('/');

    const toStart = useCallback(() => {
        setRoute('/');
    }, []);

    const toRoom = useCallback((id: string, pin: string) => {
        setRoute(`/player/${id}/${pin}`);
    }, []);

    const [page, id, pin] = route.split('/').slice(1);
    if (page === 'player' && id && pin) {
        return <Player roomId={id} pin={pin} onExit={toStart} />
    }

    return <Start toRoom={toRoom} />;

}

export default App;
