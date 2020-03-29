import { useEffect, useState } from "react"

export function useDevicesList() {

    const [audio, setAudio] = useState<MediaDeviceInfo[]>([]);
    const [video, setVideo] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        const onChange = async () => {

            const _audio: MediaDeviceInfo[] = [];
            const _video: MediaDeviceInfo[] = [];

            const devices = await navigator.mediaDevices.enumerateDevices();
            devices.forEach(function (device) {
                switch (device.kind) {
                    case 'audioinput':
                        _audio.push(device);
                        break;
                    case 'videoinput':
                        _video.push(device);
                        break
                    default:
                        break;
                }
            });
            setAudio(_audio);
            setVideo(_video);
        };

        onChange();
        navigator.mediaDevices.ondevicechange = onChange;
    }, []);

    return [audio, video];

}