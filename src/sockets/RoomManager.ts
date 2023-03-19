

import { Server, Socket } from "socket.io"
import { io } from "socket.io-client"
import { SceneManager } from "../engine/src/core/managers/SceneManager.js"
import { Scene } from "../engine/src/core/scene.js"
import { Entity, EntityPacket } from "../engine/src/types/Entity.js"
import { MainCamera } from "../GameFrontend/scenes/entities/MainCamera.js"

import { Templar } from "../GameFrontend/scenes/entities/Templar.js"
import { EngineType } from "../engine/src/constants/engineType.js"
import { Engine } from "../engine/src/core/engine.js"
import { Player } from "../interfaces/Player.js"
import { Component } from "../engine/src/types/components.js"
import { Player as GamePlayer} from "../GameFrontend/scenes/entities/Player.js"
import { SocketServerManager } from "../engine/src/core/managers/SocketServerManager.js"
import { Label } from "../GameFrontend/scenes/entities/Label.js"
import { WorldScript } from "../GameFrontend/scenes/entities/WorldScriot.js"
//Rooms are going to have more options than this. Will probably add a RoomConfig Interface
export class Room {
    players: Map<number, Player>
    roomID: number
    joinable: boolean
    roomName: string
    engine: Engine
    disconnected: number = 0
    roomManager: RoomManager
    func: any
    constructor(roomManager: RoomManager, roomID:number, roomName: string, server: Server, players: Map<number, Player> = new Map<number, Player>(), joinable: boolean = false) {
        this.players = players
        this.roomID = roomID
        this.joinable = joinable
        this.roomName = roomName
        this.roomManager = roomManager
        let label = new Label()
        let templar = new Templar()
        console.log(roomID + " is room id")
        let idString = roomID.toString()
        this.engine = new Engine(
            {

            engineType: EngineType.SOCKETSERVER,
            physicsConfig: {},

            scriptingConfig: {},
            collisionConfig: {},
            sceneConfig: [
                {
                    scene: new Test([
                        new MainCamera(),
                        label,
                        templar,
                        new WorldScript(label, templar)
                    ]),
                    entities: [
  
                    ]
    
                }
            
            ]
        })
        this.func = (id: string, event: string[], socket: Socket) => {
            
                
            socket.on("clientInitialize", () => {
                console.log("Initalize received")
                
                let entities: EntityPacket[] = []

                let ent =  this.engine.sceneManager.getCurrentScene().entities
                console.log(ent.size + " entities have been sent")
                for (let e of  ent){
                    let scene = e[1].scene as Scene
                    entities.push({
                        components: e[1].components,
                        id: e[1].id as number,
                        sceneId: scene.name,
                        entityClass: e[1].className
                        
                        
                    })


                }
                console.log("clientInitialize room id is " + id)
                server.to(id).emit("clientInitialize",entities)
                
                
            }
        )}
        
        let socketEventMap =  {"connection": this.func}
                
            
    
            console.log("Room id string before push is " + idString)
        this.engine.systems.push(new SocketServerManager(this.engine.sceneManager, {server:this.roomManager.server, socketEventMap: socketEventMap, roomId:idString}))

        this.engine.start(10)
    } 
     
    
    addPlayer(name:string, socket: Socket):Player {
        var playerID: number = this.generatePlayerID()
        var player: Player = {
            name: name, 
            clientId: playerID,
            roomId: this.roomID,
            
        }
        console.log("in Room")
        this.players.set(playerID, player)
        socket.join(this.roomID.toString())
        socket.on("disconnect", () => {
            console.log("in disconnect")
            this.disconnected++
            console.log("Player disconnected")
            if (this.disconnected == this.players.size) {
                this.engine.running = false
                setTimeout(() =>{ 
                    if (this.disconnected == this.players.size) {
                        console.log("deleting room " + this.roomID)
                        this.roomManager.deleteRoom(this.roomID)
                    }
                }, 5000)
            }
        }) 
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
    name: string = "test";
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    entities: Map<number, Entity> = new Map();
    engineComponents: Map<string, Map<number, Component>> = new Map();
     addEntity!: (scene: Scene, entity: Entity, id: number) => Entity
     constructor(entities: Entity[]) {
         for (let i = 0; i < entities.length; i++) {
             this.entities.set(i, entities[i])
         }
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

            socket.on("joined", (playerName: string, roomID:string) => {
                this.addPlayer(playerName,  socket, parseInt(roomID))
                console.log(playerName)
                console.log(roomID)
                let room = this.rooms.get(parseInt(roomID))
                
            })
            console.log("Player Joined") 

            
            
        })
        
        
    }
    addRoom(roomName: string): Room {
        console.log("Creating room")
        var roomID: number = this.generateRoomID()
        var room:Room = new Room(this, roomID, roomName, this.server)
        this.rooms.set(roomID, room)
        return room 
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
            console.log("in RoomManager")
            var room: Room = this.rooms.get(id) as Room
            var player = room.addPlayer(playerName, socket)
            //socket.join(roomID.toString())
            
            //this.server.to(roomID.toString()).emit("playerAdded", player.name, player.clientId)
            console.log("addPlayer in roommanager")
            return true
        } else {
            return false
        }
        
    }
    
}