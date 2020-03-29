import firebase from 'firebase/app';
import 'firebase/database';
import shortid from 'shortid';

const firebaseConfig = {
    apiKey: "AIzaSyC5JyZethnm-zwNGJ31UpziKMM6li_oLiQ",
    authDomain: "solo-rtc.firebaseapp.com",
    databaseURL: "https://solo-rtc.firebaseio.com",
    projectId: "solo-rtc",
    storageBucket: "solo-rtc.appspot.com",
    messagingSenderId: "344338666244",
    appId: "1:344338666244:web:a9a7c0596bdc192771f651"
};
firebase.initializeApp(firebaseConfig);

export enum SignalType {
    offer = 1,
    answer,
    new_ice_candidate,
    disconnected
}

type SignalCallback = (type: SignalType, data: any) => void;

export class Signal {
    private uid = shortid();
    private signalDB = firebase.database().ref(`${this.roomId}:${this.pin}:singals`);
    private signalCallbacks: SignalCallback[] = [];

    private onSignalListener = (snap: firebase.database.DataSnapshot) => {
        const { sender, type, message } = snap.val();
        if (sender !== this.uid) {
            this.signalCallbacks.forEach(cb => {
                cb(type, JSON.parse(message));
            });
        }
    }

    constructor(private roomId: string, private pin: string) {
        this.signalDB.on('child_added', this.onSignalListener);
    }

    public onSignal(cb: SignalCallback) {
        this.signalCallbacks.push(cb);
    }

    public async send(type: SignalType, data: any) {
        const signal = await this.signalDB.push({ sender: this.uid, type, message: JSON.stringify(data) });
        await signal.remove();
    }

    public destroy() {
        this.signalCallbacks = [];
        this.signalDB.off('child_added', this.onSignalListener);
    }
}