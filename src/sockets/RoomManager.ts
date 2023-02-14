

import { Server, Socket } from "socket.io"
import { io } from "socket.io-client"
import { SceneManager } from "../engine/src/core/managers/SceneManager.js"
import { Scene } from "../engine/src/core/scene.js"
import { Entity } from "../engine/src/types/Entity.js"
import { MainCamera } from "../GameFrontend/scenes/entities/MainCamera.js"

import { Templar } from "../GameFrontend/scenes/entities/Templar.js"
import { EngineType } from "../engine/src/constants/engineType.js"
import { Engine } from "../engine/src/core/engine.js"
import { Player } from "../interfaces/Player.js"
import { Component } from "../engine/src/types/components.js"
import { Player as GamePlayer } from "../GameFrontend/scenes/entities/Player.js"
//Rooms are going to have more options than this. Will probably add a RoomConfig Interface
export class Room {
    players: Map<number, Player>
    roomID: number
    joinable: boolean
    roomName: string
    engine: Engine
    constructor(roomID:number, roomName: string, server: Server, players: Map<number, Player> = new Map<number, Player>(), joinable: boolean = false) {
        this.players = players
        this.roomID = roomID
        this.joinable = joinable
        this.roomName = roomName
        this.engine = new Engine(
            {
            server: server,
            engineType: EngineType.SOCKETSERVER,
            physicsConfig: {},

            scriptingConfig: {},
            collisionConfig: {},
            sceneConfig: [
                {
                    scene: new Test(),
                    entities: [
                        new GamePlayer({x:0,y:0,z:0},{x:0,y:0,z:0}),
                        new Templar(),
                        new MainCamera()
                    ]
    
                }
            
            ]
        })
        this.engine.start(20)
        

    }
    
    addPlayer(name:string, socket: Socket):Player {
        var playerID: number = this.generatePlayerID()
        var player: Player = {
            name: name,
            clientId: playerID,
            roomId: this.roomID,
            
        }
        this.players.set(playerID, player)
        console.log("player added in rooms")
        return player
    }
    removePlayer(id: number): Player {
        if (this.players.has(id)) {
            var player: Player|undefined = this.players.get(id)
            this.players.delete(id)
            return player as Player
        } else {
            console.log("error")
            return {
                name: "Error Player",
                clientId: -1,
                roomId: this.roomID
            }
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

class Test implements Scene {
    engineComponents: Map<string, Map<number, Component>> = new Map<string, Map<number, Component>>()
    name: string = "test";
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    entities: Map<number, Entity> = new Map();

     addEntity!: (scene: Scene, entity: Entity, id: number) => Entity
 
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

            socket.on("AddPlayer", (playerName: string, roomID:string) => {
                this.addPlayer(playerName,  socket, parseInt(roomID))
            })
            console.log("Player Joined")
            
            
        })
        
    }
    addRoom(roomName: string): Room {
        var roomID: number = this.generateRoomID()
        var room:Room = new Room(roomID, roomName, this.server)
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
    addPlayer(playerName: string, socket: Socket, roomID: number ): boolean {
        var id: number = roomID as number
        if (this.rooms.has(roomID as number)) {
            var room: Room = this.rooms.get(id) as Room
            var player = room.addPlayer(playerName, socket)
            socket.join(roomID.toString())
            
            this.server.to(roomID.toString()).emit("playerAdded", player.name, player.clientId)
            console.log("addPlayer in roommanager")
            return true
        } else {
            return false
        }
        
    }
    
}