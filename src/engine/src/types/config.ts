import { Entity } from "./Entity"
import { Scene } from "./scene"

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
export class EngineConfig {

    graphicsConfig?: GraphicsConfig
    physicsConfig?: PhysicsConfig
    sceneConfig?: SceneConfig[]
    eventConfig?: EventConfig


}
export class SceneConfig {
    name: string
    background?: string
    entities: Entity[]

    constructor(name: string,  entities: Entity[] =[], background?: string) {
        this.name = name
        this.entities = entities
        this.background = background
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