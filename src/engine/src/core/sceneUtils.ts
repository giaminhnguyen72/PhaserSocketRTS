
import { Component } from "../types/components.js"
import { Entity } from "../types/Entity.js"
import { System } from "../types/system.js"
import { SceneManager } from "./managers/SceneManager.js"
import { Scene } from "./scene.js"

export function addSocketEntity(scene: Scene, entity: Entity, id: number) {

    var uniqueId = SceneManager.getUniqueId()
    entity.id = uniqueId
    entity.scene = scene
    scene.entities.set(uniqueId, entity)
    
    for (var comp of entity.components) {
        var compList = scene.engineComponents.get(comp.engineTag)
        if (compList) {

            let system: System<Component> | undefined= scene.sceneManager.systemTag.get(comp.engineTag)
            if (system) {
                system.register(comp)
            } 

            
        } else {
            console.log(comp.engineTag + " tagged System is not found")
            
        }
    }
    console.log("successfully added entitys")
    return entity
      
}

export function addEntity(scene: Scene,entity: Entity) {
    

    var uniqueId = SceneManager.getUniqueId()

    entity.id = uniqueId
    entity.scene = scene

    scene.entities.set(uniqueId, entity)
    
    for (var comp of entity.components) {
        var compList = scene.engineComponents.get(comp.engineTag)
        comp.entity = entity.id
        if (compList) {

            let system: System<Component> | undefined= scene.sceneManager.systemTag.get(comp.engineTag)
            if (system) {

                system.register(comp)
            } 


            
        } else {
            console.log(comp.engineTag + "does not exist")
            comp.componentId = SceneManager.getUniqueComponentId()
            
        }
    }
    console.log("successfully added entity")
    
    return entity
    

}
export function removeEntity(scene: Scene,id: number) {
    let entity : Entity | undefined = scene.entities.get(id)
    
    if (entity) {
        scene.entities.delete(id)
        for (var c of entity.components) {
            console.log("Component")
            console.log(c)
            console.log("System")
            console.log(c.system)
            console.log("Component id ")
            console.log(c.componentId)
            c.system.unregister(c.componentId as number)
        }
        
        
    }
    return entity
    
    
}
export function getEntity(scene: Scene, id: number) {
    return scene.entities.get(id)
}
export function createComponent(scene: Scene,comp: Component): Component {
        
        comp.componentId = SceneManager.getUniqueComponentId()

        return comp
}