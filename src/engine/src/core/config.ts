
import { Server } from "socket.io"
import { Socket } from "socket.io-client"
import { EngineType } from "../constants/engineType.js"
import { Entity } from "../types/Entity.js"
import { SocketManager } from "./managers/SocketManager.js"
import { Scene } from "./scene.js"

/**
 * Describes the CSS properties of the canvas element
 * 
 */
export class PhysicsConfig {

}
export class GraphicsConfig {
    parent: string
    style: Object
    background?:string
    canvasID: string
    constructor(
        parent: string="engineDiv",
        canvasID: string ="engineCanvas",
        style:Object={},
        background?: string
    ) {
        
        this.parent = parent
        this.canvasID = canvasID
        this.style = style
        this.background = background
    }

}
export interface EngineConfig {
    engineType: EngineType
    graphicsConfig?: GraphicsConfig
    physicsConfig?: PhysicsConfig
    sceneConfig?: SceneConfig[]
    eventConfig?: EventConfig
    collisionConfig?: CollisionConfig
    scriptingConfig?: ScriptingConfig
    server?: Server
    socketServerConfig?: SocketServerConfig
    socketClientConfig?: SocketClientConfig


}


export class SceneConfig {
    
    entities: Entity[]
    scene: Scene
    constructor(scene: Scene,  entities: Entity[] =[]) {
        this.scene = scene
        this.entities = entities

    }
}
export class EventConfig {
    keyboard: boolean
    mouse: boolean
    constructor(keyboard:boolean, mouse: boolean) {
        this.keyboard = keyboard
        this.mouse = mouse
    }
}
export class CollisionConfig {

}
export class ScriptingConfig {

}
export interface SocketServerConfig {
    socketEventMap: Map<string, (socket: Socket) => void>
}
export interface SocketClientConfig {
    socketEventMap: Map<string, (socket: Socket) => void>
}