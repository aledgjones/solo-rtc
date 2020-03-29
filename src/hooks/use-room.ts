import { useEffect, useState, useMemo } from 'react';

import { Peer } from './peer';

export function useRoom(roomId: string, pin: string, localStream?: MediaStream): [string, MediaStream | undefined] {

    const [connection, setConnection] = useState<Peer | undefined>();
    const [state, setState] = useState<string>('waiting');
    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();

    useEffect(() => {
        const _connection = new Peer(roomId, pin);
        setConnection(_connection);

        _connection.onRemoteStream((stream: any) => {
            setRemoteStream(stream);
        });

        _connection.onConnectionStateChange((_state: string) => {
            setState(_state);
            if (_state === 'disconnected') {
                setRemoteStream(undefined);
            }
        });

        return () => {
            setConnection(undefined);
            _connection.destroy();
        }
    }, [roomId, pin]);

    useEffect(() => {
        if (connection && localStream) {
            connection.addStream(localStream);
        }

        return () => {
            if (connection) {
                connection.removeStream();
            }
        }
    }, [connection, localStream]);

    return [state, remoteStream];

}