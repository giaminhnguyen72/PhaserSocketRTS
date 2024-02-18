import { Component } from "react";
import { MouseEmitter, MouseEmitter3d, MouseListener } from "../../engine/src/systems/events/components/MouseHandler.js";
import { EngineType } from "../../engine/src/constants/engineType.js";
import { SceneConfig } from "../../engine/src/core/config.js";
import { SceneManager } from "../../engine/src/core/managers/SceneManager.js";
import { Stage } from "../../engine/src/core/scene.js";
import { KeyBoardEmitter, KeyboardListener } from "../../engine/src/systems/events/components/KeyboardHandler.js";
import { SocketClient } from "../../engine/src/systems/MultiplayerClient/components/SocketClientHandler.js";
import { SocketManager } from "../../engine/src/systems/MultiplayerClient/SocketManager.js";
import { Entity } from "../../engine/src/types/Entity.js";
import { Label } from "./entities/Label.js";
import { MainCamera } from "./entities/MainCamera.js";
import { Player } from "./entities/Player.js";

import { Templar } from "./entities/Templar.js";
import { Knight} from "./entities/Player/Knight.js";
import { SwordAttack } from "./entities/SwordAnim.js";
import { Grass } from "./entities/background/Grass.js";
import { OrthographicCamera3d } from "../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";
import * as THREE from 'three'
import { PhysicsEngine } from "../../engine/src/systems/physics/PhysicsEngine.js";
import { Transformable } from "../../engine/src/types/components.js";
import { PlayerUIForm } from "./entities/DomComponents/PlayerSelect/PlayerSelectForm.js";
export class MainScene extends Stage {
    sceneConfig: SceneConfig
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    engineComponents: Map<string, Map<number, Component>> = new Map();
    static SocketHandler: SocketClient
    constructor(entities: Entity[]) {
         super("MainScene", {xMin: -1024, xMax: 1024, yMin: -1024, yMax: 1024, zMin: -10000, zMax: 10000 })
         this.sceneConfig = new SceneConfig(entities)
         let knight:Knight = new Knight()

         
         let camera = new OrthographicCamera3d(2000,1000 , {x:0, y:0, z:50})
         let UIForm = new PlayerUIForm(camera)
         this.sceneConfig.entities.push( UIForm)
         camera.visible = true
         let socket = new SocketClient(this,
             {   "connect": () => {
                 console.log("connected")
                 let roomId: string = window.location.pathname
                 let roomArr: string[]  = roomId.split("/")
                 SocketManager.getInstance().emit("joined", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])
 
                 console.log("emitting")
                 
                 //engine.start(2000)
                 },
                 "disconnect": () => {
                     throw new Error() 
                 },
                 "getComponentID": (id: any) =>{
                    let player = this.entities.get(id)
                    let system = this.sceneManager.queryEngine<PhysicsEngine>("PHYSICS", PhysicsEngine)
                    if (system) {
                        
                    }
                    
                 }
                 
                 
             }
 
 
             , {engineType: EngineType.SOCKETCLIENT})
             MainScene.SocketHandler = socket
        let keyEmitter = new KeyBoardEmitter(EngineType.SOCKETCLIENT)
        let keyListener = new KeyboardListener({
            "keydown": (key) => {
                
                if (key.key == "w"  || key.key == "a" || key.key == "s" || key.key == "d") {
                    socket.queueEvent({
                        event:"keydown",
                        data: key.key
                    })
                }
                
            }
        })
        let mouseEmit = new MouseEmitter3d(EngineType.SOCKETCLIENT)
        
        let mouseListener = new MouseListener(
            {
                "click": (event) => {
                    
                    var vec = new THREE.Vector3(); // create once and reuse
                    var pos = new THREE.Vector3(); // create once and reuse

                    let vector = new THREE.Vector3();
                    vector.set(
                    (event.pos.x / (window.innerWidth)) * 2  - 1,
                    - (event.pos.y / (window.innerHeight)) * 2 + 1,
                    0,
                    );
                    let vecd =vector.unproject(camera.component);
                    let position = {
                        x: vector.x,
                        y: vector.y,
                        z:0
                    }
                    
                    socket.queueEvent({
                        event: "click",
                        data: position
                    })
                    
                }
            }
        )  

         socket.addClass<Templar>("Templar", Templar)
         socket.addClass<MainCamera>("MainCamera", MainCamera)
         socket.addClass<Player>("Player", Player)
         socket.addClass<Label>("Label", Label)
         socket.addClass<SwordAttack>("SWORDANIM", SwordAttack)
         socket.addClass<Knight>("KNIGHT", Knight)
         
         this.components.push(socket, keyEmitter, keyListener, mouseEmit, mouseListener, camera)
 
     }
     getSceneConfig() {
         this.sceneConfig.entities.push(this)
         return this.sceneConfig 
     }
 
 }