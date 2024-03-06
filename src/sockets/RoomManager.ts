

import { Server, Socket } from "socket.io"
import { io } from "socket.io-client"
import { SceneManager } from "../engine/src/core/managers/SceneManager.js"
import { Scene, Stage } from "../engine/src/core/scene.js"
import { Entity, EntityPacket } from "../engine/src/types/Entity.js"
import { MainCamera } from "../GameFrontend/scenes/entities/MainCamera.js"

import { Templar } from "../GameFrontend/scenes/entities/Templar.js"
import { EngineType } from "../engine/src/constants/engineType.js"
import { Engine } from "../engine/src/core/engine.js"
import { Player } from "../interfaces/Player.js"
import { Component } from "../engine/src/types/components.js"
import { Player as GamePlayer} from "../GameFrontend/scenes/entities/Player.js"
import { SocketServerManager } from "../engine/src/systems/MultiplayerServer/SocketServerManager.js"
import { Label } from "../GameFrontend/scenes/entities/Label.js"
import { WorldScript } from "../GameFrontend/scenes/entities/WorldScriot.js"

import { World } from "../GameFrontend/scenes/entities/World.js"
import { PhysicsConfig, SceneConfig } from "../engine/src/core/config.js"
import { SocketServer } from "../engine/src/systems/MultiplayerServer/components/SocketServerHandler.js"
import { MultiplayerStage } from "../engine/src/core/MultiplayerScene.js"
import { Knight } from "../GameFrontend/scenes/entities/Player/Knight.js"
import { ScriptingEngine } from "../engine/src/systems/scripting/ScriptingEngine.js"
import { Script } from "..//engine/src/systems/scripting/components/Script.js"
import { getDirection, moveTowards } from "../engine/src/math/Vector.js"
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
            physicsConfig: new PhysicsConfig(),

            scriptingConfig: {engineType: EngineType.SOCKETSERVER},
            collisionConfig: {},
            sceneConfig: [
                
                new Test(
                
                    )
    
                
            
            ]
        })

                
            
    
            console.log("Room id string before push is " + idString)
        this.engine.systems.push(new SocketServerManager(this.engine.sceneManager, {server:this.roomManager.server,  roomId: idString, buffer: 0, delay: 0}))

        this.engine.start(50)
    } 
     
    
    addPlayer(name:string, socket: Socket):Player {
        let playerID: number = this.generatePlayerID()
        let player: Player = {
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
                }, 50)
            }
        }) 
        console.log("player added in rooms")
        
        return player
    }
    removePlayer(id: number): Player {
        if (this.players.has(id)) {
            let player: Player|undefined = this.players.get(id)
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
        let totalFactor = 100000000
        let playerID:number = Math.round((Math.random() * totalFactor));
        while (this.players.has(playerID)) {
            playerID = Math.round(Math.random() * totalFactor);
        }
        return playerID
    } 

}

class Test extends MultiplayerStage implements Entity{

   background?: string | undefined;
   time: number = 0;
   
    
    constructor(...entities: Entity[]) {
        super("MainScene",{xMin: -10000, xMax: 10000, yMin: -10000, yMax: 10000, zMin: -10000, zMax: 10000 }, ...entities)
        
        let comp = new SocketServer({},{}, EngineType.SOCKETSERVER)

        let script = new Script("Scene", EngineType.SOCKETSERVER,(dt: number) => {
            let c = script.system.queryClass("Livable")
            let players = script.system.queryClass("KNIGHT")
            if (players) {
                for (let script of players) {
                    let destination = script.properties.get("Destination")
                    let position = script.properties.get("Position")
                    if (destination && position) {
                        moveTowards(position, destination, dt, 0.1, 5)
                    }
                }
            }
            if (c) {
                for (let script of c) {
                    let healthy = script.properties.get("HP")
                    if (healthy) {
                        if (healthy <= 0) {
                            this.removeEntity(script.entity as number)
                        }
                    }
                }
            }
        })
        comp.initializeEventCallback({"connection": {
            "click": (pos) => {
                    let character = comp.playerCharacter.get(pos.socketId)
                    let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                    if (engine && character) {

                        for (let i = 0; i < character.components.length;i++) {
                            let script = engine.components.get(character.components[i].componentId as number)
                            if (script) {
                                let position = script.properties.get("Position")
                                if (position) {
                                    script.properties.set("Direction", getDirection(position, pos.data))
                                }
                                
                                script.properties.set("Destination", pos.data)
                                break
                            }
                        }


                    }

                    
                    console.log("click has been received " + JSON.stringify(pos))
                 
        },
            "keydown": (data) => { 
                    let character = comp.playerCharacter.get(data.socketId)
                    let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                    console.log("Key down has been pressed")
                    if (engine && character ) {
                        console.log("found character")
                        for (let i = 0; i < character.components.length;i++) {
                            let script = engine.components.get(character.components[i].componentId as number)
                            if (script) {
                                let Inventory = script.properties.get("Inventory")
                                if (Inventory) {
                                    console.log("found Inventory")
                                    Inventory[0].use(script)
                                }
                            }
                        }


                    }

            }
        }})

        this.components.push(comp, script) 
        
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
                SocketServer.addPlayerToRoom(socket, roomID)
                let item = SocketServer.SocketServerMap.get(roomID)
                if (item) {
                    let knight =  new Knight()
                    item.playerCharacter.set(socket.id,knight)
                    item.system.sceneManager.getCurrentScene().addEntity(knight)
                }
                console.log(playerName)
                console.log(roomID)
                let room = this.rooms.get(parseInt(roomID))
                
            })
            console.log("Player Joined") 

            
            
        })
        
        
    }
    addRoom(roomName: string): Room {
        console.log("Creating room")
        let roomID: number = this.generateRoomID()
        let room:Room = new Room(this, roomID, roomName, this.server)
        this.rooms.set(roomID, room)
        
        return room 
    }
    deleteRoom(id: number): boolean {
        if (this.rooms.has(id)) {
            let isDeleted: boolean = this.rooms.delete(id)
            SocketServer.removeRoom(id.toString() )
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
        let totalFactor = 100000000
        let roomID:number = Math.round((Math.random() * totalFactor));
        while (this.rooms.has(roomID)) {
            roomID = Math.round(Math.random() * totalFactor);
        }
        return roomID
    } 
    addPlayer(playerName: string, socket: Socket, roomID: number ): boolean { 
        let id: number = roomID as number
        if (this.rooms.has(roomID as number)) {
            console.log("in RoomManager")
            let room: Room = this.rooms.get(id) as Room
            let player = room.addPlayer(playerName, socket)
            //socket.join(roomID.toString())
            
            //this.server.to(roomID.toString()).emit("playerAdded", player.name, player.clientId)
            console.log("addPlayer in roommanager")
            return true
        } else {
            return false
        }
        
    }
    
}