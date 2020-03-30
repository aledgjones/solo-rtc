import { useEffect, useState } from 'react';
import { Peer } from './peer';

export function useRoom(roomId: string, pin: string, local?: MediaStream): [string, MediaStream | undefined] {

    const [ts, setTs] = useState(Date.now());
    const [state, setState] = useState<string>('waiting');
    const [remote, setRemote] = useState<MediaStream>();
    const [pc, setPc] = useState<Peer>();

    useEffect(() => {

        const connection = new Peer(roomId, pin);

        connection.onRemoteStream((stream: any) => {
            setRemote(stream);
        });

        connection.onConnectionStateChange((s: string) => {
            setState(s);
            if (s === 'disconnected') {
                setRemote(undefined);
                setTs(Date.now()); // force a refresh of the peer connection
            }
        });

        setPc(connection);

        return () => {
            connection.destroy();
        }

    }, [roomId, pin, ts]);

    useEffect(() => {
        const cb = () => pc && pc.destroy();
        window.addEventListener('beforeunload', cb);
        return () => {
            window.removeEventListener('beforeunload', cb);
        }
    }, [pc]);

    useEffect(() => {
        if (pc && local) {
            pc.addStream(local);
        }

        return () => {
            pc && pc.removeStream();
        }
    }, [pc, local]);

    return [state, remote];

}