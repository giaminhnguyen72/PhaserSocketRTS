import Phaser from "phaser"
import { Server, Socket } from "socket.io"
import { io } from "socket.io-client"
import { Player } from "../interfaces/Player.js"
import { ExceptionHandler } from "winston"
import { runInThisContext } from "vm"
//Rooms are going to have more options than this. Will probably add a RoomConfig Interface
export class Room {
    players: Map<number, Player>
    roomID: number
    joinable: boolean
    roomName: string
    constructor(roomID:number, roomName: string, players: Map<number, Player> = new Map<number, Player>(), joinable: boolean = false) {
        this.players = players
        this.roomID = roomID
        this.joinable = joinable
        this.roomName = roomName
    }
    
    addPlayer(name:string):Player {
        var playerID: number = this.generatePlayerID()
        var player: Player = {
            name: name,
            clientId: playerID,
            roomId: this.roomID
        }
        this.players.set(playerID, player)
        console.log("player added in rooms")
        return player
    }
    removePlayer(id: number): Player {
        if (this.players.has(id)) {
            this.players.delete(id)
            return {
                name: "",
                clientId: 23453,
                roomId: 345
            }
        } else {
            console.log("error")
        }
        return {
            name: "Error Player",
            clientId: -1,
            roomId: this.roomID
        }
    }
    generatePlayerID(): number {
        var totalFactor = 100000000
        var playerID:number = Math.round((Math.random() * totalFactor));
        while (this.players.has(playerID)) {
            playerID = Math.round(Math.random() * totalFactor);
        }
        return playerID
    }

}
export default class RoomManager {
    rooms: Map<number, Room>;
    server: Server
    constructor(server: Server) {
        this.rooms = new Map<number, Room>();
        this.server = server
        this.setUpEvents()
    }
    setUpEvents(): void {
        this.server.on("connection", (socket: Socket)=> {
            
            socket.on("playerJoined", () => {
                console.log("Player event has been actived")
                
            })
            
            
        })
        
    }
    addRoom(roomName: string): Room {
        var roomID: number = this.generateRoomID()
        var room:Room = new Room(roomID, roomName)
        this.rooms.set(roomID, room)
        return room;
    }
    deleteRoom(id: number): boolean {
        if (this.rooms.has(id)) {
            var isDeleted: boolean = this.rooms.delete(id)
        }
        return false
    }
    removeRoom(roomID: number) {
        if (this.rooms.has(roomID)) {
            this.rooms.delete(roomID)
        } else {
            console.log("Delete error room not found")
        }
    }

    hasRoom(roomID: number): boolean {
        return this.rooms.has(roomID)
    }
    generateRoomID(): number {
        var totalFactor = 100000000
        var roomID:number = Math.round((Math.random() * totalFactor));
        while (this.rooms.has(roomID)) {
            roomID = Math.round(Math.random() * totalFactor);
        }
        return roomID
    }
    addPlayer(playerName: string, roomID?: number): boolean {
        var id: number = roomID as number
        if (this.rooms.has(roomID as number)) {
            var room = this.rooms.get(id)
            var player = room?.addPlayer(playerName)
            
            this.server.sockets.emit("playerAdded",player, roomID)
            console.log("addPlayer in roommanager")
            return true
        } else {
            return false
        }
        
    }
    
}