
import { SceneManager } from "../core/managers/SceneManager.js"
import { Component } from "./components.js"
import { SceneConfig } from "./config.js"
import { Entity} from "./Entity.js"

export class Scene {
    name: string
    
    background?: string
    time: number
    entities: Map<number, Entity>
    engineComponents: Map<string, Component[]>
    constructor(sceneConfig: SceneConfig) {
        this.name = sceneConfig.name
        this.entities = new Map<number,Entity>()
        this.engineComponents = new Map<string, Component[]>
        
        for (var e of sceneConfig.entities) {
            
            this.addEntity(e)
            
        }
        
        this.background = sceneConfig.background
        this.time = 0

    }
    addEntity(entity: Entity) {
        var uniqueId = SceneManager.getUniqueId()
        this.entities.set(uniqueId, {
            components: entity.components,
            id: uniqueId,
            scene: this
        })
        

    }
    removeEntity(id: number) {
        return this.entities.delete(id)
    }
    getEntity(id: number) {
        return this.entities.get(id)
    }
}
