
import { io, Socket } from "socket.io-client";
import {WaitingScene} from "./scenes/WaitingScene.js";

import {Engine} from "../engine/src/core/engine.js"
import { EngineConfig, GraphicsConfig } from "../engine/src/core/config.js";
import { GraphicsEngine } from "../engine/src/graphics/GraphicEngine.js";
import { Player } from "./scenes/entities/Player.js";


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
    let engine: Engine = new Engine({
        isServer: false,
        physicsConfig: {},
        graphicsConfig: new GraphicsConfig("test", "193as", {"background-color": "white", "width": "100%", "height": "100%"} ),
        sceneConfig: 
            [
                {
                    name: "as",
                    entities: [
                        new Player({x:0, y:0, z:15}, {x:0.001,y: 0,z: 0})
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




