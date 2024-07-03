

import {Engine} from "../engine/src/core/engine.js"
import { GraphicsConfig, PhysicsConfig, SceneConfig, SocketClientConfig } from "../engine/src/core/config.js";


import { EngineType } from "../engine/src/constants/engineType.js";
import { SocketManager } from "../engine/src/systems/MultiplayerClient/SocketManager.js";
import { Script } from "../engine/src/systems/scripting/components/Script.js";
import { Label } from "./scenes/entities/Label.js";


import { MainScene } from "./scenes/MainScene.js";



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
    let player =  
    */


        

   
    let engine: Engine = new Engine({
        engineType: EngineType.SOCKETCLIENT,
        graphicsConfig: new GraphicsConfig("test", "193as", {"display:flex;background-color": "white", "width": "100%", "height": "100%", "z-index":"0"} ),
        sceneConfig: 
            [
                
                    MainScene
    
                
            
            ],
        physicsConfig: new PhysicsConfig(), 
        eventConfig: {keyboard: false,mouse: false },
        scriptingConfig: {engineType: EngineType.SOCKETCLIENT},
        system: [[SocketManager, {
        

            socketEventMap: (socket: any) => {
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
    
    }]]

    })
    

    engine.start(10)
    

}



 