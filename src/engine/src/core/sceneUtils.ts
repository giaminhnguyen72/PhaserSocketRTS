
import { EngineType } from "../constants/engineType.js"
import { Component } from "../types/components.js"
import { Entity } from "../types/Entity.js"
import { System } from "../types/system.js"
import { SceneManager } from "./managers/SceneManager.js"
import { Scene } from "./scene.js"
//addin
export function addSocketEntity(scene: Scene, entity: Entity): Entity {

   
    let uniqueId = SceneManager.getUniqueId()

    entity.id = uniqueId
    entity.scene = scene

    scene.entities.set(uniqueId, entity)
    
    for (let comp of entity.components) {
        let compList = scene.engineComponents.get(comp.engineTag)
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
//adding entity on server
export function addEntity(scene: Scene,entity: Entity) {
    

    let uniqueId = SceneManager.getUniqueId()

    entity.id = uniqueId
    entity.scene = scene

    scene.entities.set(uniqueId, entity)
    
    for (let comp of entity.components) {
        let compList = scene.engineComponents.get(comp.engineTag)
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
export function serverAdd(scene:Scene, entity: Entity) {
    if (entity.id == null || entity.id == undefined) {
        throw new Error("Entity id is undefined")
    }
    
    entity.scene = scene
    scene.entities.set(entity.id as number, entity)
    if (scene.newEntityQueue) {
        let isInQueue = scene.newEntityQueue.has(entity.id as number)
        if (!isInQueue) {
            for (let comp of entity.components) {
                let compList = scene.engineComponents.get(comp.engineTag)
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
        }
        
        return entity
    } else {
    
        for (let comp of entity.components) {
            let compList = scene.engineComponents.get(comp.engineTag)
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
}
export function removeEntity(scene: Scene,id: number) {
    let entity : Entity | undefined = scene.entities.get(id)
    
    if (entity) {
        scene.entities.delete(id)
        for (let c of entity.components) {
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
export function createEntity<T extends Entity>(packet: T): T {
    return packet

}