import Phaser = require("phaser")
import { Socket } from "socket.io"
import { ExceptionHandler } from "winston"

class Room {
    player: Player[]
    roomID: string
    joinable: boolean

    constructor(players: Player[], roomID:string, joinable: boolean) {
        this.player = players
        this.roomID = roomID
        this.joinable = joinable

    }

}
export default class RoomManager {
    rooms: Map<number, Room>;
    constructor() {
        this.rooms = new Map<number, Room>();

    }
    addRoom(creator: Player) {
        var players: Player[] = [];
        players.push(creator);
        
        var roomID:number = Math.random() * 100000000;
        while (this.rooms.has(roomID)) {
            roomID = Math.random() * 100000000;
        }
        var room:Room = new Room(players,  roomID.toString(), true)
        this.rooms.set(roomID, room)
    }
    deleteRoom(id: number) {
        if (this.rooms.size == 0) {
            
        }
        if (this.rooms.has(id)) {
            this.rooms.delete(id)
        }
    }
    joinRoom(socket: Socket) {

    }
    removeUser(socket: Socket) {
        
    }

}