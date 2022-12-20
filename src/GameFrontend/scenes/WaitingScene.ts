import Phaser from 'phaser'
import { Player } from 'Player.js'
import {io, Socket} from 'socket.io-client'


export default class WaitingScene extends Phaser.Scene {
    socket: Socket;
    constructor(socket: Socket) {
        super({
            key: "WaitingScene"
        })
        this.socket = socket
    }
    preload(): void {
        var count = 0
        var socket = this.socket
        socket.on("playerAdded", (player: Player, roomID: number) => {
            var playerInfo  = " PlayerName: " + player.name + "          PlayerID: "+ player.clientId
            this.add.text(100, 100 + count * 10, playerInfo)
            this.add.text(200, 150 + count * 10, player.roomId.toString())
            count++
            console.log("Player has been added")
        })
    }
    create(): void {
        this.add.text(0,0,"Waiting Stuff")

        
    }

}