
import { io, Socket } from "socket.io-client";
import {WaitingScene} from "./scenes/WaitingScene.js";

import Phaser from "phaser"
import {Engine} from "../engine/src/core/engine.js"
import { EngineConfig, GraphicsConfig } from "../engine/src/types/config.js";
import { GraphicsEngine } from "../engine/src/graphics/GraphicEngine.js";


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

    var engine: Engine = new Engine({
        physicsConfig: {},
        graphicsConfig: new GraphicsConfig("test", "193as", {"background-color": "blue"} )
    })
}
