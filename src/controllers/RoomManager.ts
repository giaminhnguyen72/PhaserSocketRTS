import { Socket } from "socket.io";

class RoomManager {
    rooms: string[] 
    totalRoom: number;
    constructor() {
        this.rooms = []
        this.totalRoom = 0;
    }
    createRoom(roomName: string): void {
        if (this.rooms.includes(roomName)) {

        }
        this.rooms.push(roomName)

    }
    generateRoomId(): Number {
        let roomID: Number = Math.random() * 1000

        return 5
    }
    async joinRoom(socket: Socket): Promise<void> {
        
    }
    leaveRoom(socket: Socket): void {

    }
    removeRoom(roomId: Number): void {
        
    }
}