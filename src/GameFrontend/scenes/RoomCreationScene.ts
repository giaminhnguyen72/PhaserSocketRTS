import { Socket, io } from "socket.io-client"

export default class RoomCreationScene extends Phaser.Scene {
    constructor() {
        super({
            key: "RoomCreationScene"
        })
    }
    preload(): void {
        const socket: Socket = io()
        socket.on("connect", ()=> {
            console.log('Connected')
        })
        socket.on("disconnect", () => {
            console.log('disconnected')
        })
        socket.emit("createRoom")
    }
    create(): void {
        this.add.text(0,0,"RoomCreationScene")
    }

}