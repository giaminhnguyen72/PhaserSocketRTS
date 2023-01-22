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
                compList.push(this.createComponent(comp))
            } else {
                console.log(comp.engineTag)
                for (var key of this.scene.engineComponents.keys()) {
                    console.log(key)
                }
                
                throw Error("something wrong adding entities")
            }
        }

    }
    removeEntity(id: number): Entity | undefined {
        
        var entity = this.getEntity(id)
        if (entity) {
            for (var e of entity.components) {
                var engineCompList = this.scene.engineComponents.get(e.engineTag)
                if (engineCompList) {
                    for (var i = 0; i < engineCompList.length; i++) {
                        if (engineCompList[i].entity == entity) {
                            engineCompList.splice(i, 1)
                        }
                    }
                }
            }
        }
        return entity
    }
    getEntity(id: number) {
        return this.scene.entities.get(id)
    }
    createComponent(comp: Component): Component {
            
            comp.componentId = SceneManager.getUniqueComponentId()

            return comp
    }
}