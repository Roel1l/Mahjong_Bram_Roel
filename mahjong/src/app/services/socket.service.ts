import { Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";

//Socket
import * as io from '../../socket.io.js';

@Injectable()
export class SocketService {

    constructor( ) { };

    private socket: any;

    public match: Subject<any> = new Subject<any>();
    public start: Subject<any> = new Subject<any>();
    public end: Subject<any> = new Subject<any>();
    public playerJoined: Subject<any> = new Subject<any>();

    public connectToGame(gameId){
        this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + gameId);
        this.subscribeToSocketMessages();
    }

    subscribeToSocketMessages(): void {
        this.socket.on('start', (data) => {
            this.start.next(data);
        });
        this.socket.on('match', (data) => {
            this.match.next(data);
        });
        this.socket.on('end', (data) => {
              this.end.next(data);
        });
        this.socket.on('playerJoined', (data) => {
             this.playerJoined.next(data);
        });
    }
}
