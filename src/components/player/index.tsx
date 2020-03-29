import React, { FC, useEffect, useRef, useState } from 'react';
import { mdiMicrophone, mdiVideo, mdiCallMade } from '@mdi/js';
import { THEME } from '../../const';

import { useDevicesList } from '../../hooks/use-devices-list';

import { Icon } from '../../ui/components/icon';
import { Subheader } from '../../ui/components/subheader';
import { merge } from '../../ui/utils/merge';
import { Spinner } from '../../ui/components/spinner';

import { useStream } from '../../hooks/use-stream';
import { useRoom } from '../../hooks/use-room';

import './styles.css';

interface Props {
    roomId: string;
    pin: string;

    onExit: () => void;
}

const Player: FC<Props> = ({ roomId, pin, onExit }) => {

    const localVideoElement = useRef<HTMLVideoElement>(null);
    const remoteVideoElement = useRef<HTMLVideoElement>(null);

    const [fixed, setFixed] = useState(true);
    const [audioSettings, setAudioSettings] = useState(false);
    const [videoSettings, setVideoSettings] = useState(false);

    const [audioSelection, setAudioSelection] = useState<string>();
    const [videoSelection, setVideoSelection] = useState<string>();

    const [audioDevices, videoDevices] = useDevicesList();
    const [localStream, videoId, audioId] = useStream(videoSelection, audioSelection);
    const [state, remoteStream] = useRoom(roomId, pin, localStream);

    useEffect(() => {
        if (localVideoElement.current && localStream) {
            localVideoElement.current.srcObject = localStream;
        }
    }, [localVideoElement, localStream]);

    useEffect(() => {
        if (remoteVideoElement.current && remoteStream) {
            remoteVideoElement.current.srcObject = remoteStream;
        }
    }, [remoteVideoElement, remoteStream]);

    useEffect(() => {
        setTimeout(() => setFixed(false), 4000);
    });

    return <>
        <div className="player">

            <video style={{ visibility: remoteStream ? 'visible' : 'hidden' }} className="player__remote" ref={remoteVideoElement} autoPlay controls={false} />

            {state === 'waiting' && <p className="player__state">Waiting for participant</p>}
            {state === 'connecting' && <Spinner size={24} color={THEME.PRIMARY} className="player__loader" />}
            {state === 'disconnected' && <p className="player__state">Disconnected</p>}

            <div className="player__touch-zone" onClick={() => {
                setAudioSettings(false);
                setVideoSettings(false);
            }} />

            <div className={merge("player__actions", { 'player__actions--fixed': audioSettings || videoSettings || fixed })}>

                <div className="player__action" onClick={onExit}>
                    <Icon className="player__action-icon" path={mdiCallMade} size={24} color="#ffffff" />
                    <p className="player__action-label">Leave</p>
                </div>

                <div className="player__details player__action">
                    <div className="player__text">
                        <p>
                            <span>Meeting ID: </span>
                            <span>{roomId}</span>
                        </p>
                        <p>
                            <span>Pin: </span>
                            <span>{pin}</span>
                        </p>
                    </div>
                </div>

                <div className="player__actions-group">

                    {audioSettings && <div className="settings__panel">
                        <Subheader className="settings__subheader">Audio Inputs</Subheader>
                        {audioDevices.map(device => {

                            const active = device.deviceId === audioId;

                            return <div key={device.deviceId} className="settings__item" onClick={() => !active && setAudioSelection(device.deviceId)}>
                                <Icon path={mdiMicrophone} size={24} color={active ? THEME.PRIMARY : "#ffffff"} />
                                <div className="settings__item-name">
                                    <p className="settings__item-name-main">{device.label}</p>
                                    <p className="settings__item-name-sub">{active && 'Active'}</p>
                                </div>
                            </div>
                        })}
                    </div>}

                    {videoSettings && <div className="settings__panel">
                        <Subheader className="settings__subheader">Video Inputs</Subheader>
                        {videoDevices.map(device => {

                            const active = device.deviceId === videoId;

                            return <div key={device.deviceId} className="settings__item" onClick={() => !active && setVideoSelection(device.deviceId)}>
                                <Icon path={mdiVideo} size={24} color={active ? THEME.PRIMARY : "#ffffff"} />
                                <div className="settings__item-name">
                                    <p className="settings__item-name-main">{device.label}</p>
                                    <p className="settings__item-name-sub">{active && 'Active'}</p>
                                </div>
                            </div>
                        })}
                    </div>}

                    <div className={merge("player__action", { 'player__action--active': audioSettings })} onClick={() => {
                        setAudioSettings(s => !s);
                        setVideoSettings(false);
                    }}>
                        <Icon className="player__action-icon" path={mdiMicrophone} size={24} color="#ffffff" />
                        <p className="player__action-label">Audio</p>
                    </div>
                    <div className={merge("player__action", { 'player__action--active': videoSettings })} onClick={() => {
                        setVideoSettings(s => !s);
                        setAudioSettings(false);
                    }}>
                        <Icon className="player__action-icon" path={mdiVideo} size={24} color="#ffffff" />
                        <p className="player__action-label">Video</p>
                    </div>
                    <div className="player__local-container">
                        <Spinner color={THEME.PRIMARY} size={24} />
                        <video className="player__local" ref={localVideoElement} muted autoPlay controls={false} />
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Player;
