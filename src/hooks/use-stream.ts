import { useEffect, useState } from "react";

export function useStream(videoSelection?: string, audioSelection?: string): [MediaStream | undefined, string | undefined, string | undefined] {

    const [stream, setStream] = useState<MediaStream>();
    const [audioId, setAudioId] = useState<string>();
    const [videoId, setVideoId] = useState<string>();

    useEffect(() => {

        let _stream: MediaStream;

        (async () => {
            _stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: { ideal: videoSelection },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: {
                    deviceId: { ideal: audioSelection },
                    autoGainControl: false,
                    echoCancellation: false,
                    noiseSuppression: false,
                    latency: 0,
                    sampleRate: 48000,
                    sampleSize: 16
                }
            });

            setStream(_stream);
            _stream.getTracks().forEach(track => {
                const { deviceId } = track.getSettings();
                switch (track.kind) {
                    case 'audio':
                        setAudioId(deviceId);
                        break;
                    case 'video':
                        setVideoId(deviceId);
                        break;
                    default:
                        break;
                }

            });

        })();

        return () => {
            if (_stream) {
                _stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }

    }, [videoSelection, audioSelection]);

    return [stream, videoId, audioId];
}