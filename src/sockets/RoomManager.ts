

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
import { getDirection, getDistance, moveTowards } from "../engine/src/math/Vector.js"
import { FindSkill } from "../GameFrontend/scenes/Skills/SkillNavigation.js"
import { SpawnMonsters } from "../GameFrontend/scenes/Skills/SpawnSkills/Spawn.js"
import { BearSystem } from "../GameFrontend/scenes/entities/Mobs/Bear.js"
import { CandowispSystem } from "../GameFrontend/scenes/entities/Mobs/Candowisp.js"
import { DarkMageSystem } from "../GameFrontend/scenes/entities/Mobs/DarkMage.js"
import { EarthTortoiseSystem } from "../GameFrontend/scenes/entities/Mobs/EarthTortoise.js"
import { GiantSpider, SpiderSystem } from "../GameFrontend/scenes/entities/Mobs/GiantSpider.js"
import { MindFlayerSystem } from "../GameFrontend/scenes/entities/Mobs/MindFlayer.js"
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
                
                Test
    
                
            
            ],
            system: [[SocketServerManager,  {server:this.roomManager.server,  roomId: idString, buffer: 0, delay: 0}]]
            
        })

                
            

        // this.engine.systems.push(new SocketServerManager(this.engine.sceneManager, {server:this.roomManager.server,  roomId: idString, buffer: 0, delay: 0}))

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
   
    
    constructor(scene:SceneManager, entities: Entity[]) {
        super("MainScene",{xMin: -10000, xMax: 10000, yMin: -10000, yMax: 10000, zMin: -10000, zMax: 10000 }, ...entities)
        this.sceneManager = scene
        let comp = new SocketServer({},{}, EngineType.SOCKETSERVER)

        let script = new Script("Scene", EngineType.SOCKETSERVER,(dt: number) => {
            let c = script.system.queryClass("Livable")
            let players = script.system.queryClass("KNIGHT")
            let Projectile = script.system.queryClass("Projectile")
            let Spinning = script.system.queryClass("Spinning")
            let Moveable = script.system.queryClass("Moveable")
            let Enemy = script.system.queryClass("Enemy")
            let time = script.properties.get("Time")
            if (time != null && time != undefined) {
                if (time > 10000) {
                    let pos = {
                        x: Math.random() * 1000 - 500, 
                        y: Math.random() * 1000 - 500,
                        z: 10
                    }
                    let pos2 = {
                        x: Math.random() * 1000 - 500, 
                        y: Math.random() * 1000 - 500,
                        z: 10
                    }
                    SpawnMonsters(this, 9, pos)
                    SpawnMonsters(this, 11, pos2)
                    for (let i = 0; i< 14; i++) {
                        let newPos = {
                            x: Math.random() * 1000 - 500, 
                            y: Math.random() * 1000 - 500,
                            z: 10
                        }
                        SpawnMonsters(this, i, newPos)
                        
                    }
                    time = time % 1000
                }
                time += dt
                script.properties.set("Time",time)
            }
            // Enemy system
            if (Enemy && players) {
                let player;
                for (let i of players) {
                    player = i
                    break
                }
                let position = player?.properties.get("Position")
                if (position) {
                    for (let e of Enemy) {
                        let ePos = e.properties.get(("Destination"))
                        let distance = getDistance(ePos, position)
                        let range= e.properties.get("Range")
                        if (ePos && range == 0) {
                            ePos.x =  position.x
                            ePos.y= position.y
                            
                        } else if (distance < range ) {

                        }
                    }
                }

            }
            if (Moveable) {
                for (let script of Moveable) {
                    let destination = script.properties.get("Destination")
                    let position = script.properties.get("Position")
                    let speed = script.properties.get("Speed")
                    if (destination && position && speed) {
                        moveTowards(position, destination, dt, speed, 5)
                        let direction = script.properties.get("Direction")
                        if (direction) {
                            let dirVec = getDirection(position, destination)
                            direction.x = dirVec.x
                            direction.y = dirVec.y
                        }
                    }
                }
            }
            if (Spinning) {
                for (let i of Spinning) {
                    let script = i
                    let position = script.properties.get("Position")
                    let Axis = script.properties.get("Axis")
                    let radius = script.properties.get("Radius")
                    let angle = script.properties.get("Angle")
                    let Duration = script.properties.get("Time")
                    if (angle && position && Axis && radius) {
                        let theta = angle + 2 * Math.PI * dt/ Duration 
                        let x = Axis.x + radius * Math.cos(theta)
                        let y = Axis.y + radius * Math.sin(theta)
                        position.x = x
                        position.y = y
    
                        script.properties.set("Angle", theta)
                    }
                }

            }
            //Projectile System
            if (Projectile) {
                for (let i of Projectile) {
                    let Duration = i.properties.get("Duration")
                    
                    if (Duration && Duration <= 0 ) {
                        this.removeEntity(i.entity as number)
                    } else {
                        i.properties.set("Duration", Duration - dt)
                    }
                }
            }


            // HP System
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
        script.properties.set("Time", 0)
        script.setInit((s) => {
            s.addOperation([BearSystem, CandowispSystem, DarkMageSystem, EarthTortoiseSystem, SpiderSystem, MindFlayerSystem])
        }
        )
        comp.initializeEventCallback({"connection": {
            "click": (pos) => {
                    let character = comp.playerCharacter.get(pos.socketId)
                    let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                    if (engine && character) {
                        // On Click Get the Player's Direction and Set it to that Direction
                        // Also choose that position as the destination
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


            },
            "Skill": (data) => {
                console.log("Received skill")
                let character = comp.playerCharacter.get(data.socketId)
                let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                if (character && engine) {
                    for (let i = 0; i < character.components.length;i++) {
                        let charScript = engine.components.get(character.components[i].componentId as number)
                        
                        if (charScript) {
                            FindSkill(data.data,charScript , this)
                            break
                        }
                    }
                }
                
            }
        }
    
    
    })

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
                    let ent = item.system.sceneManager.getCurrentScene().addEntity(knight)
                    socket.emit("PlayerID", ent.id)
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
            SocketServer.GetSocketServerMap().delete(roomID.toString())
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