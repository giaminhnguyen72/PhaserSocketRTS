import Phaser from 'phaser'
import { Player } from 'Player.js'
import {io, Socket} from 'socket.io-client'


export default class WaitingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "WaitingScene"
        })
    }
    preload(): void {
        const socket: Socket = io()
        var count = 0
        socket.on("connect", ()=> {
            console.log('Connected')
            socket.emit("playerJoined")
        })
        socket.on("disconnect", () => {
            console.log('disconnected')
        })
        socket.on("playerAdded", (player: Player) => {
            var playerInfo  = " PlayerName: " + player.name + "          PlayerID: "+ player.clientId
            this.add.text(100, 100 + count * 10, playerInfo)
            console.log("Player has been added")
        })
    }
    create(): void {
        this.add.text(0,0,"Waiting Stuff")

        
    }

}