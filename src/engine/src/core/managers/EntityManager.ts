import { Component } from "../../types/components.js"
import { Entity } from "../../types/Entity.js"
import { Scene } from "../scene.js"
import { SceneManager } from "./SceneManager.js"

export class EntityManager {
    scene:Scene
    constructor(scene: Scene) {
        this.scene = scene
    }
    addEntity(entity: Entity) {
        var uniqueId = SceneManager.getUniqueId()
        entity.id = uniqueId
        entity.scene = this.scene
        this.scene.entities.set(uniqueId, entity)
        
        for (var comp of entity.components) {
            var compList = this.scene.engineComponents.get(comp.engineTag)
            if (compList) {
                let createdComponent = this.createComponent(comp)
                compList.set(createdComponent.componentId as number, createdComponent)
            } else {
                console.log(comp.engineTag + " tagged System is not found")
                
            }
        }
        console.log("successfully added entity")

    }
    removeEntity(id: number){
        

    
    }
    getEntity(id: number) {
        return this.scene.entities.get(id)
    }
    createComponent(comp: Component): Component {
            
            comp.componentId = SceneManager.getUniqueComponentId()

            return comp
    }
}