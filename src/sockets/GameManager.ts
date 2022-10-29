
import { SocketOptions } from "mongodb";
import { Server, Socket } from "socket.io";
import PlayRouter from "../routes/playRouter.js";
import Route from "../routes/route.js";
import RoomManager from "./RoomManager.js";

export default class GameManager {
    server: Server;
    router: Route
    constructor(server: Server, router: PlayRouter) {
        this.server = server
        this.router= router
        this.setUpServer()
    }
    setUpServer() {
        this.server.on('connection', async (socket: Socket) => {
            this.setUpSocket(socket)
        })
    }
    setUpSocket(socket:Socket) {
        socket.on('disconnect', () => {
            
        })
        socket.on('startGame', () => {

        })
        socket.on('joinGame', () => {

        })
        socket.on('removeUser', () => {

        })
    }
    createGame(): void {
        
    }
    generateRoomID(): string {
        return ""
    }
    joinRoom(roomId: string) {

    }
}