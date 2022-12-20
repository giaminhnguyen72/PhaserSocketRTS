
import { io, Socket } from "socket.io-client";
import WaitingScene from "./scenes/WaitingScene.js";


class Game extends Phaser.Game {
    constructor(config: any) {
        super(config)
    }
}
function startGame() {
    let gameState: number = 1
    while (gameState != 0) {
        console.log("Start game loop")
        gameState = 0
    }

}

window.onload = () => {
    var socket: Socket = io()

    let CONFIG: any = {
        type: Phaser.AUTO,
        title: 'test',
        parent: 'game',
        scene: [
            new WaitingScene(socket)
        ]

    }
        socket.on("connect", ()=> {
            console.log('Connected')
            socket.emit("playerJoined")
            
        })
        socket.on("disconnect", () => {
            console.log('disconnected')
        })
    var game: Phaser.Game = new Phaser.Game(CONFIG)
    
}