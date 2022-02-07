
import { SocketOptions } from "mongodb";
import { Server, Socket } from "socket.io";
import PlayRouter from "../routes/playRouter";
import Route from "../routes/route";
import RoomManager from "./RoomManager";

export default class GameManager {
    server: Server;
    router: Route
    roomManager: RoomManager
    constructor(server: Server, router: PlayRouter) {
        this.server = server
        this.router= router
        this.roomManager = new RoomManager()
        router.setRoomManager(this.roomManager)
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