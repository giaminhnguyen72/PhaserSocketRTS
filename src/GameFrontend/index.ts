
import { io, Socket } from "socket.io-client";
import {WaitingScene} from "./scenes/WaitingScene.js";

import {Engine} from "../engine/src/core/engine.js"
import { EngineConfig, GraphicsConfig } from "../engine/src/core/config.js";
import { GraphicsEngine } from "../engine/src/systems/graphics/GraphicEngine.js";
import { Player } from "./scenes/entities/Player.js";
import { Scene } from "../engine/src/core/scene.js";
import { SceneManager } from "../engine/src/core/managers/SceneManager.js";
import { Component } from "../engine/src/types/components.js";
import { Entity } from "../engine/src/types/Entity.js";
import { Templar } from "./scenes/entities/Templar.js";
import { MainCamera } from "./scenes/entities/MainCamera.js";
import { EngineType } from "../engine/src/constants/engineType.js";


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
    
   }
    let engine: Engine = new Engine({
        engineType: EngineType.SOCKETCLIENT,
        physicsConfig: {},
        graphicsConfig: new GraphicsConfig("test", "193as", {"background-color": "white", "width": "100%", "height": "100%"} ),
        sceneConfig: 
            [
                {
                    scene: new Test(),
                    entities: [
                        new Player({x:0, y:0, z:15}, {x:2,y: 3,z: 0}),
                        new Templar(),
                        new MainCamera()
                    ]
    
                }
            
            ],
        eventConfig: {
            keyboard: true,
            mouse: true
        },
        scriptingConfig: {},
        collisionConfig: {}
    })
    
    engine.start(1)
}




