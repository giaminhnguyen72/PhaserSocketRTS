

import { SceneManager } from "./managers/SceneManager.js"
import { Component } from "../types/components.js"
import { SceneConfig } from "./config.js"
import { Entity} from "../types/Entity.js"
import { System } from "../types/system.js"
import { EntityManager } from "./managers/EntityManager.js"

export class Scene {
    name: string
    entityManager: EntityManager
    sceneManager: SceneManager
    background?: string
    time: number
    entities: Map<number, Entity>
    engineComponents: Map<string, Component[]>
    constructor(sceneManager: SceneManager, sceneConfig: SceneConfig, systems: System<Component>[]) {
        this.sceneManager = sceneManager
        this.name = sceneConfig.name
        this.entities = new Map<number,Entity>()
        this.engineComponents = new Map<string, Component[]>()
        this.entityManager = new EntityManager(this)
        for (var system of systems) {

            this.engineComponents.set(system.tag, [])
        }
        for (var e of sceneConfig.entities) {
            
            this.addEntity(e)
            
        }
        console.log(this.engineComponents)
        
        this.background = sceneConfig.background
        this.time = 0

    }
    update(dt: number) {
        // apply world rules
    }
    addEntity(entity: Entity) {
        var uniqueId = SceneManager.getUniqueId()
        entity.id = uniqueId
        entity.scene = this
        this.entities.set(uniqueId, entity)
        
        for (var comp of entity.components) {
            var compList = this.engineComponents.get(comp.engineTag)
            if (compList) {
                compList.push(this.createComponent(comp))
            } else {
                console.log(comp.engineTag + " tagged System is not found")
                
            }
        }
        console.log("successfully added entity")

    }
    removeEntity(id: number): Entity | undefined {
        
        var entity = this.getEntity(id)
        if (entity) {
            for (var e of entity.components) {
                var engineCompList = this.engineComponents.get(e.engineTag)
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
        return this.entities.get(id)
    }
    createComponent(comp: Component): Component {
            
            comp.componentId = SceneManager.getUniqueComponentId()

            return comp
    }
}
