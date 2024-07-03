

import { Server, Socket } from "socket.io"
import { io } from "socket.io-client"
import { SceneManager } from "../engine/src/core/managers/SceneManager.js"
import { Scene, Stage } from "../engine/src/core/scene.js"
import { Entity, EntityPacket } from "../engine/src/types/Entity.js"


import { Templar } from "../GameFrontend/scenes/entities/Templar.js"
import { EngineType } from "../engine/src/constants/engineType.js"
import { Engine } from "../engine/src/core/engine.js"
import { Player } from "../interfaces/Player.js"
import { Component } from "../engine/src/types/components.js"

import { SocketServerManager } from "../engine/src/systems/MultiplayerServer/SocketServerManager.js"
import { Label } from "../GameFrontend/scenes/entities/Label.js"



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
import { GamePlayer } from "../GameFrontend/scenes/entities/Mobs/Player.js"
import { ExpEvent, ExpSystem} from "../GameFrontend/events/ExpEvent.js"
import { VectorContainer } from "../engine/src/systems/scripting/types/Containers.js"
import { Regen, RegenSystem } from "../GameFrontend/events/Regen.js"
import { Poison, PoisonSystem } from "../GameFrontend/events/Poison.js"
import { SnakeSystem } from "../GameFrontend/scenes/entities/Mobs/Snake.js"
import { CollisionSystem } from "../engine/src/systems/Collision/CollisionSystem.js"
import { Slow, SlowSystem } from "../GameFrontend/events/Slow.js"
import { ModifierOperation } from "../GameFrontend/scenes/ScriptSystems/Reset.js"
import { Rage, RageSystem } from "../GameFrontend/events/Rage.js"
import { ObjectOperation } from "../GameFrontend/scenes/ScriptSystems/ObjecrSystem.js"
import { EarthquakeSystem } from "../GameFrontend/scenes/entities/Attacks/Earthquake.js"
import { SnowmonSystem } from "../GameFrontend/scenes/entities/Mobs/Snowmon.js"
import { EvilAngelrSystem } from "../GameFrontend/scenes/entities/Mobs/EvilAngel.js"
import { SkeletonSystem } from "../GameFrontend/scenes/entities/Mobs/Skeleton.js"
import { LavaPoolSystem } from "../GameFrontend/scenes/entities/Attacks/LavaPool.js"
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
                
                let timeout = setTimeout(() =>{ 
                    if (this.disconnected == this.players.size) {

                        console.log("deleting room " + this.roomID)
                        let s =  SocketServerManager.socket.in(this.roomID.toString()).fetchSockets()
                        s.then((sockets) => {
                            for (let i of sockets) {
                                i.disconnect(true)
                                
                            }

                        })
                        SocketServerManager.socket.in(this.roomID.toString()).disconnectSockets(true)
                        
                        this.roomManager.deleteRoom(this.roomID)
                        socket.removeAllListeners()
                        socket.disconnect(true)
                        

                        clearTimeout(timeout)
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
   entityCount: number = 0
    
    constructor(scene:SceneManager, entities: Entity[]) {
        super("MainScene",{xMin: -10000, xMax: 10000, yMin: -10000, yMax: 10000, zMin: -10000, zMax: 10000 }, ...entities)
        this.sceneManager = scene 
        let comp = new SocketServer({},{}, EngineType.SOCKETSERVER)
        let e = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING",ScriptingEngine)

        let script = new Script("Scene", EngineType.SOCKETSERVER,(dt: number) => {
            let c = script.system.queryClass("Livable")
            let players = script.system.queryClass("PLAYER")
            let Projectile = script.system.queryClass("Projectile")
            let Spinning = script.system.queryClass("Spinning")
            let Moveable = script.system.queryClass("Moveable")
            let Enemy = script.system.queryClass("Enemy")
            let time = script.get("Time")
            if (time != null && time != undefined) {
                if (time > 8000) {
                    let size = 0
                    if (players) {
                        size = players.size
                    }
                    let engine = this.querySystem<CollisionSystem>(CollisionSystem, "COLLISION")
                    if (engine) {
                        
                        
                        for (let i = 0; i < size; i++) {
                            let counter = 0;
                            let pos = {
                                x: Math.random() * 1000 - 500, 
                                y: Math.random() * 1000 - 500,
                                z: 10
                            }
                            let pos1 = {
                                x: Math.random() * 1000 - 500, 
                                y: Math.random() * 1000 - 500,
                                z: 10
                            }
                            let col = engine.collisionQuery({pos: pos, dim: {length: 96,height: 96}, rot: 0})
                            while (counter < 2 && col.length !== 0) {
                                pos.x = Math.random() * 1000 - 500
                                pos.y = Math.random() * 1000 - 500
                                col = engine.collisionQuery({pos: pos, dim: {length: 96,height: 96}, rot: 0})
                                counter++
                            }
                            if (col.length === 0) {
                                let num = Math.floor(Math.random() * 30)
                                SpawnMonsters(this,num, pos)
                                SpawnMonsters(this,15, pos1) 
                            }


                        }
                    }

                    time = time % 1000
                }
                time += dt
                script.set("Time",time)
                if (players) {
                    for (let player of players) {
                        let playerHP = player.get("HP")
                        if (playerHP <= 0) {

                            this.removeEntity(player.entity as number)
                            comp.emit({event:"Dead", data: player.entity})
                        }
                        
                        let cooldown = player.get("Cooldown")
                        player.set("Cooldown", cooldown + dt)
                        let staminaProp = player.get("Stamina")
                        let StaminaCooldown = player.get("StaminaCooldown")
                        if (StaminaCooldown >= 500 && staminaProp < 100) {
                            let newStamina = staminaProp + 5
                            if (newStamina > 100) {
                                newStamina = 100
                            }
                            player.set("Stamina", newStamina)
                            player.set("StaminaCooldown", 0)
                        } else {
                            player.set("StaminaCooldown", StaminaCooldown + dt)
                        }
                    }

                }
            }
            // Enemy system
            if (Enemy && players) {

                let player;
                for (let i of players) {
                    player = i

                    break
                }
                let position = player?.get("Position")
                if (position) {
                    for (let e of Enemy) {
                        let ePos = e.get(("Destination"))
                        let distance = getDistance(ePos, position)
                        let range= e.get("Range")
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
                    let destination = script.get("Destination")
                    let position = script.get("Position")
                    let speed = script.get("Speed")
                    let modifier = script.get("Modifier")
                    
                    if (destination && position && speed) {
                        moveTowards(position, destination, dt, speed * modifier.speed, 5)
                        
                        let direction = script.get("Direction")
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
                    let position = script.get("Position")
                    let Axis = script.get("Axis")
                    let radius = script.get("Radius")
                    let angle = script.get("Angle")
                    let Duration = script.get("Time")
                    let Direction = script.get("Direction")
                    if (angle !== undefined && position && Axis && radius) {
                        
                        if (Direction == 1) {
                            let theta = angle + 2 * Math.PI * dt/ Duration 
                            let x = Axis.x + radius * Math.cos(theta)
                            let y = Axis.y + radius * Math.sin(theta)
                            position.x = x
                            position.y = y
                            script.set("Angle", theta)
                        } else {
                            let theta = angle + 2 * Math.PI * dt/ Duration 
                            let x = Axis.x - radius * Math.cos(theta)
                            let y = Axis.y - radius * Math.sin(theta)
                            position.x = x
                            position.y = y
                            script.set("Angle", theta)
                        }

    
                        
                    }
                }

            }
            //Projectile System
            if (Projectile) {
                for (let i of Projectile) {
                    let Duration = i.get("Duration")
                    
                    if (Duration && Duration <= 0 ) {
                        this.removeEntity(i.entity as number)
                    } else {
                        i.set("Duration", Duration - dt)
                    }
                }
            }


            // HP System
            if (c) {
                for (let script of c) {
                    let healthy = script.get("HP")
                    if (healthy) {
                        if (healthy <= 0) {
                            this.removeEntity(script.entity as number)
                        }
                    }
                }
            }

            

        })
        script.set("Time", 0)
        script.setInit((s) => {
            
            s.operations.addContainer<ExpEvent,VectorContainer<ExpEvent>>(ExpEvent,VectorContainer<ExpEvent>)
            s.operations.addContainer<Regen,VectorContainer<Regen>>(Regen,VectorContainer<Regen>)
            s.operations.addContainer<Poison,VectorContainer<Poison>>(Poison,VectorContainer<Poison>)
            s.operations.addContainer<Slow,VectorContainer<Slow>>(Slow,VectorContainer<Slow>)
            s.operations.addContainer<Rage,VectorContainer<Rage>>(Rage,VectorContainer<Rage>)
            s.addOperation([ObjectOperation,SnowmonSystem,BearSystem,EarthquakeSystem, CandowispSystem,
                EvilAngelrSystem, LavaPoolSystem,
                 DarkMageSystem, EarthTortoiseSystem, SpiderSystem, MindFlayerSystem, ExpSystem, RegenSystem, PoisonSystem, SnakeSystem, ModifierOperation,SkeletonSystem,SlowSystem,RageSystem])
        }
        )
        SocketServer.initializeSocketCallback({
            "connection": (s: Socket) => {
                if (s.recovered == true) {
                    console.log("Reconnected")
                    let room = SocketServer.GetPlayerRoom(s)
                    if (room) {
                        room.reconnected(s)
                    }
                    
                } else {
                    // s.on("Respawn", () => {
                    //     console.log("Recived Respawn event")
                    //     console.log("There are " + comp.playerCharacter.size + " characters")
                    //     SocketServer.GetSocketServerMap().get
                    //     let char = comp.getCharacter(s)
                    //     if (char) {
                    //         let ent = this.addEntity(char) as GamePlayer
                    //         for (let i of entponeznts) {
                    //             i.entity = ent.id
                    //         }
                    //         ent.components[2].set("HP", 100)
                    //         ent.components[1].pos.x = 0
                    //         ent.components[1].pos.y = 0
                    //         console.log("Respawned entity")
                            
                    //         s.emit("PlayerID", ent.id)
                    //     } else {
                    //         console.log("Cant find entity")
                    //     }
                    // })
                    s.on("disconnect", (reason) => {
                        //TODO check disconection time 
                        // Player disconnects for small time and gets removed from server
                        console.log("Player Disconnected")
                        let room = SocketServer.GetPlayerRoom(s)
                        if (room) {
                            room.addDisconnect(s)
                        }
                        
                    })
                }

                
            }
        })
        comp.initializeEventCallback({"connection": {
            "Respawn": (event) => {
                let char = comp.getCharacter(event.socketId)
                if (char) {
                    let ent = this.addEntity(char) as GamePlayer
                    for (let i of ent.components) {
                        i.entity = ent.id
                    }
                    ent.components[2].set("HP", 100)
                    ent.components[1].pos.x = 0
                    ent.components[1].pos.y = 0
                    console.log("Respawned entity")
                    console.log
                    event.socketId.emit("PlayerID", [ent.id,Array.from(ent.components[2].get("Unlocked"))])
                } else {
                    console.log("Cant find entity")
                }
            },
            "click": (pos) => {
                    let character = comp.playerCharacter.get(pos.socketId)

                    let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                    if (engine && character) {
                        // On Click Get the Player's Direction and Set it to that Direction
                        // Also choose that position as the destination
                        for (let i = 0; i < character.components.length;i++) {
                            let script = engine.components.get(character.components[i].componentId as number)
                            if (script) {
                                let position = script.get("Position")
                                if (position) {
                                    script.set("Direction", getDirection(position, pos.data))
                                }
                                
                                script.set("Destination", pos.data) 
                                break
                            }
                        }


                    }

                    
                    
                 
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
                            let unlockedSet = charScript.get("Unlocked")
                            if (unlockedSet.has(data.data[0] == false)) {
                                return
                            }
                            let dir = charScript.get("Direction")
                            dir.x = data.data[1]
                            dir.y = data.data[2]
                            
                            
                            FindSkill(data.data[0],charScript , this)
                            break
                        }
                    }
                }

            },
            "Unlock": (data) => {
                // The client player is trying to unlock a skill and the server is verifying if she can or not
                console.log("Received unlock Skill " + data.data)
                let character = comp.playerCharacter.get(data.socketId)
                let engine = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                if (character && engine) {
                    for (let i = 0; i < character.components.length;i++) {
                        let charScript = engine.components.get(character.components[i].componentId as number)
                        
                        if (charScript) {
                            let unlockedSet = charScript.get("Unlocked")
                            
                            unlockedSet.add(data.data)
                            
                            
                            FindSkill(data.data[0],charScript , this)
                            break
                        }
                    }
                }
                comp.emit({
                    event: "UnlockSkill",
                    data: data.data
                })
            },
            
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
                let item = SocketServer.GetSocketServerMap().get(roomID)
                console.log("Player jolined")

                if (item) {
                    let playerEntity = item.getCharacter(socket)
                    let knight = undefined
                    if (playerEntity) { 
                        knight = playerEntity as GamePlayer
                        console.log( knight.components[2].get("Unlocked"))
                        socket.emit("PlayerID",[ knight.id, Array.from(knight.components[2].get("Unlocked"))])
                    } else {
                        knight =  new GamePlayer()
                        let ent = item.system.sceneManager.getCurrentScene().addEntity(knight)
                        console.log( knight.components[2].get("Unlocked"))
                        socket.emit("PlayerID",[ knight.id, Array.from(knight.components[2].get("Unlocked"))])
                    }
                    
                    item.playerCharacter.set(socket,knight)
                    
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
            console.log("Room is deleted " + isDeleted)
            SocketServer.removeRoom(id.toString() )
        }
        return false
    }
    removeRoom(roomID: number) {
        if (this.rooms.has(roomID)) {
            this.rooms.delete(roomID)
            console.log(this.rooms.size)
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