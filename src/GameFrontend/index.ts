
import { io, Socket } from "socket.io-client";
import {WaitingScene} from "./scenes/WaitingScene.js";

import {Engine} from "../engine/src/core/engine.js"
import { EngineConfig, GraphicsConfig, SocketClientConfig } from "../engine/src/core/config.js";
import { GraphicsEngine } from "../engine/src/systems/graphics/GraphicEngine.js";
import { Player } from "./scenes/entities/Player.js";
import { Scene } from "../engine/src/core/scene.js";
import { SceneManager } from "../engine/src/core/managers/SceneManager.js";
import { Component } from "../engine/src/types/components.js";
import { Entity, EntityPacket } from "../engine/src/types/Entity.js";
import { Templar } from "./scenes/entities/Templar.js";
import { MainCamera } from "./scenes/entities/MainCamera.js";
import { EngineType } from "../engine/src/constants/engineType.js";
import { SocketManager } from "../engine/src/core/managers/SocketManager.js";
import { Script } from "../engine/src/components/Script/Script.js";
import { Label } from "./scenes/entities/Label.js";


window.onload = () => {
    /**
     * 
     
    var socket: Socket = io()

    let CONFIG: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        title: 'test',
        parent: 'game',
        scene: [
            new WaitingScene(socket)
        ],
        scale: {
            mode: Phaser.Scale.CENTER_BOTH,
            width: window.screen.availWidth - (window.outerWidth - window.innerWidth),
            height: window.screen.availHeight - (window.outerHeight - window.innerHeight)
        },
        backgroundColor: "#3aba3a",
        url: window.location.hostname,

        dom: {
            createContainer: true
        }
    }
        socket.on("connect", ()=> {
            console.log('Connected')
            var roomId: string = window.location.pathname
            var roomArr: string[]  = roomId.split("/")
            console.log(roomArr[roomArr.length-1])
            console.log(roomId)
            socket.emit("AddPlayer", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])
            
        })
        socket.on("disconnect", () => {
            console.log('disconnected')
        })
    var game: Phaser.Game = new Phaser.Game(CONFIG)
    */


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
    let engine: Engine = new Engine({
        engineType: EngineType.SOCKETCLIENT,
        graphicsConfig: new GraphicsConfig("test", "193as", {"background-color": "white", "width": "100%", "height": "100%"} ),
        sceneConfig: 
            [
                {
                    scene: new Test([

                    ]),
                    entities: []
    
                }
            
            ],

        scriptingConfig: {},
        collisionConfig: {}

    })
    let map: Map<string, ()=>Entity> = new Map()
    map.set("Templar", ()=>{ return new Templar()})
    map.set("MainCamera", () => {console.log("camera made");return new MainCamera()})
    map.set("Player", ()=> {return new Player()})
    map.set("Label", () => {return new Label()})
    
    engine.systems.push(new SocketManager(engine.sceneManager, {
        
        entityFactoryMap: map,
        socketEventMap: (socket) => {
            socket.on("clientInitialize", (entities: EntityPacket[]) => {
                console.log("clientInitialize activated")
                

                for (let entitySent of entities) {
                    let getScene = engine.sceneManager.scenes.get(entitySent.sceneId)
                    if (getScene) {
                        let newEntityFactory = map.get(entitySent.entityClass)
                        if (newEntityFactory) {
                            let newEntity = newEntityFactory()
                            newEntity.id = entitySent.id
                            newEntity.scene = engine.sceneManager.scenes.get(entitySent.sceneId)
                            for (let i = 0; i < newEntity.components.length; i++) {
                                
                                newEntity.components[i].copy(entitySent.components[i])
                                
                            }
                            getScene.entities.set(newEntity.id as number, newEntity)
                            console.log("Added "+ newEntity.className)

                        
                        } else {
                            //throw new Error("Cannot find entity; Class name: " + entitySent.entityClass)
                        }


                        
                    } else {
                        throw new Error("Scene not found")
                    }
                    
                }
                
                engine.start(4000)
                

                /** 
                for (let e of entity) {
                    let id = 0
                    if (e.id ) {
                        id = e.id
                    } else {
                        throw new Error("Sent items is " + entity )
                    }
                    engine.sceneManager.getCurrentScene().addEntity(engine.sceneManager.getCurrentScene(),e , e.id)
                }
                */
            })
            socket.on("connect", () => {
                console.log("connected")
                var roomId: string = window.location.pathname
                var roomArr: string[]  = roomId.split("/")
                socket.emit("joined", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])

                console.log("emitting")
                socket.emit("clientInitialize")
                //engine.start(2000)
            })
            socket.on("update", (entities: EntityPacket[]) => {

                for (let entitySent of entities) {
                    let getScene = engine.sceneManager.scenes.get(entitySent.sceneId)
                    if (getScene) {
                        
                        for (let i = 0; i < entitySent.components.length; i++) {
                            let engine = getScene.engineComponents.get(entitySent.components[i].engineTag)
                            let comp = engine?.get(entitySent.components[i].componentId as number)
                            if (comp) {
                                comp.copy(entitySent.components[i])
                            }
                            
                            
                        }


                        
                    } else {
                        throw new Error("Scene not found")
                    }
                }

            })
    }

    }))
    

}



 