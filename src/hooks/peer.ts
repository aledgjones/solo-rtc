import { Signal, SignalType } from "./signal";




export class Peer {

    private connection = new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] });
    private signal = new Signal(this.roomId, this.pin);

    private tracks: RTCRtpSender[] = [];
    private streamAddedCallbacks: any[] = [];
    private connectionCallbacks: any[] = [];

    constructor(private roomId: string, private pin: string) {
        this.signal.onSignal((type, data) => this.onSignal(type, data));
        this.connection.addEventListener('negotiationneeded', () => this.offer());
        this.connection.addEventListener('icecandidate', e => this.onIceCandidateCallback(e));
        this.connection.addEventListener('connectionstatechange', () => this.onConnectionStateChangeCallback());
        this.connection.addEventListener('track', e => this.onTrackCallback(e));
    }

    private async onSignal(type: SignalType, message: any) {
        switch (type) {
            case SignalType.offer: {
                console.log('receiving offer....');
                await this.connection.setRemoteDescription(message);
                const answer = await this.connection.createAnswer();
                await this.connection.setLocalDescription(answer);
                console.log('sending answer....');
                await this.signal.send(SignalType.answer, answer);
                break;
            }
            case SignalType.answer: {
                console.log('receiving answer....');
                await this.connection.setRemoteDescription(message);
                break;
            }
            case SignalType.new_ice_candidate: {
                try {
                    console.log('adding new ice candidate...');
                    await this.connection.addIceCandidate(message);
                } catch (e) {
                    console.error('Error adding received ice candidate', e);
                }
                break;
            }
            case SignalType.disconnected: {
                this.connectionCallbacks.forEach(cb => {
                    cb('disconnected');
                });
                break;
            }
            default:
                break;
        }
    }

    private async offer() {
        const offer = await this.connection.createOffer();
        if (this.connection.signalingState === "stable") {
            console.log('sending offer....');
            await this.connection.setLocalDescription(offer);
            this.signal.send(SignalType.offer, offer);
        }
    }

    private async onIceCandidateCallback(event: RTCPeerConnectionIceEvent) {
        if (event.candidate) {
            console.log('sending new ice candidate...');
            await this.signal.send(SignalType.new_ice_candidate, event.candidate);
        }
    }

    private async onConnectionStateChangeCallback() {
        this.connectionCallbacks.forEach(cb => {
            cb(this.connection.connectionState);
        });
    }

    private async onTrackCallback(event: RTCTrackEvent) {
        console.log('receiving stream....');
        this.streamAddedCallbacks.forEach(cb => {
            cb(event.streams[0]);
        });
    }

    public addStream(stream: MediaStream) {
        if (this.connection.connectionState !== 'closed') {
            console.log('sending stream...');
            stream.getTracks().forEach(track => {
                this.tracks.push(this.connection.addTrack(track, stream));
            });
        }
    }

    public removeStream() {
        if (this.connection.connectionState !== 'closed') {
            console.log('removing stream...');
            this.tracks.forEach(track => {
                this.connection.removeTrack(track);
            });
            this.tracks = [];
        }
    }

    public onRemoteStream(cb: any) {
        this.streamAddedCallbacks.push(cb);
    }

    public onConnectionStateChange(cb: any) {
        this.connectionCallbacks.push(cb);
    }

    public destroy() {
        this.signal.send(SignalType.disconnected, {});
        this.signal.destroy();
        this.connection.close();
        this.streamAddedCallbacks = [];
        this.connectionCallbacks = [];
    }

}