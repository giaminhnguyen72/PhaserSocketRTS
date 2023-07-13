
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
import { SwordAnim } from "./scenes/entities/SwordAnim.js";
import { serverAdd } from "../engine/src/core/sceneUtils.js";
import { Div } from "../engine/src/components/Graphics/DomElement/Div.js";
import { DivUI } from "./scenes/entities/DivUI.js";
import { World } from "./scenes/entities/World.js";


window.onload = () => {
    /**
     * 
     
    let socket: Socket = io()

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
            let roomId: string = window.location.pathname
            let roomArr: string[]  = roomId.split("/")
            console.log(roomArr[roomArr.length-1])
            console.log(roomId)
            socket.emit("AddPlayer", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])
            
        })
        socket.on("disconnect", () => {
            console.log('disconnected')
        })
    let game: Phaser.Game = new Phaser.Game(CONFIG)
    */


   class Test implements Scene {
       name: string = "test";
       sceneManager!: SceneManager;
       background?: string | undefined;
       time: number = 0;
       entities: Map<number, Entity> = new Map();
       engineComponents: Map<string, Map<number, Component>> = new Map();
        addEntity!: (scene: Scene, entity: Entity) => Entity
        constructor(entities: Entity[]) {
            for (let i = 0; i < entities.length; i++) {
                this.entities.set(i, entities[i])
            }
        }
        getSceneConfig() {
            return {
                entities: []
            }
        }
    
   }
    let engine: Engine = new Engine({
        engineType: EngineType.SOCKETCLIENT,
        graphicsConfig: new GraphicsConfig("test", "193as", {"display:flex;background-color": "white", "width": "100%", "height": "100%", "z-index":"0"} ),
        sceneConfig: 
            [
                
                    new Test([
                        new MainCamera(),
                        new Templar(),
                        new DivUI(),
                        new World(EngineType.SOCKETCLIENT)
                    ])
    
                
            
            ],

        scriptingConfig: {}

    })
    let map: Map<string, ()=>Entity> = new Map()
    map.set("Templar", ()=>{ return new Templar()})
    map.set("MainCamera", () => {console.log("camera made");return new MainCamera()})
    map.set("Player", ()=> {return new Player()})
    map.set("Label", () => {return new Label()})
    map.set("SWORDANIM", ()=> {return new SwordAnim()})
    
    engine.systems.push(new SocketManager(engine.sceneManager, {
        
        entityFactoryMap: map,
        socketEventMap: (socket) => {
            /**
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
                            getScene.addEntity(getScene, newEntity, -1)
                            console.log("Added "+ newEntity.className)

                        
                        } else {
                            //throw new Error("Cannot find entity; Class name: " + entitySent.entityClass)
                        }


                        
                    } else {
                        throw new Error("Scene not found")
                    }
                    
                }
                
                */
                

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
            //})
            socket.on("connect", () => {
                console.log("connected")
                let roomId: string = window.location.pathname
                let roomArr: string[]  = roomId.split("/")
                socket.emit("joined", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])

                console.log("emitting")
                socket.emit("clientInitialize")
                //engine.start(2000)
            })
            
            
    }

    }))
    engine.start(10)
    

}



 