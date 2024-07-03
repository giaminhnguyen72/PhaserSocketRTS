

import { SceneManager } from "./managers/SceneManager.js"
import { Component } from "../types/components.js"
import { SceneConfig } from "./config.js"
import { Entity} from "../types/Entity.js"
import { System } from "../types/system.js"
import { EngineType } from "../constants/engineType.js"


export interface Scene extends Entity {
    name: string
    newEntityQueue?: Map<number, Entity>
    sceneManager: SceneManager
    background?: string
    time: number
    entities: Map<number, Entity>
    worldBounds: {xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number }
    addEntity: (entity: Entity) => Entity
    getSceneConfig() : SceneConfig
    getUniqueId(): number
    getUniqueComponentId(): number,
    removeEntity(id: number): void
    classMap?: Map<string, Map<number, Entity>> 
    querySystem<T extends System<Component>> (type: {new(...args: any[]): T}, engineTag: string):  T | undefined
    querySys (engineTag: string): System<Component> | undefined
    queryComponent<T extends Component>(type: {new(...args: any[]): T}, entityTag: string):  T[]
    update(dt: number): void
    createEntity(className:string, components: Component[]): Entity
}
export class Stage implements Scene, Entity {
    components: Component[] = []
    scene?: Scene = this
    className: string = "STAGE"
    name: string 
    time: number = 0
    entities: Map<number, Entity> = new Map()
    sceneManager!: SceneManager
    classMap: Map<string, Map<number, Entity>> = new Map()
    worldBounds: {xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number }
    id: number = 0
    componentId = 0
    addedEntities: Entity[] = []
    removedEntities: number [] = []
    constructor(stageName: string, worldBound: {xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number }, ...components: Component[]) {
        this.name = stageName
        this.worldBounds = worldBound
        for (let i of components) {
            this.components.push(i)
        }
    }
    newEntityQueue?: Map<number, Entity> | undefined
    background?: string | undefined
    createEntity(className: string, components: Component[] = []): Entity {

        
        let entity:Entity = {
            scene:this,
            components: components,
            className: className
        }
        return entity

    }
    update(dt: number): void {
        while (this.addedEntities.length > 0) {
            let ent = this.addedEntities.pop()
            if (ent) {
                this.executeEntityAdd(ent)
            }
            
        }
        while (this.removedEntities.length > 0) {
            let ent = this.removedEntities.pop()
            if (ent) {
                this.executeEntityRemove(ent)
            }
            
        }

    }
    
    getSceneConfig(): SceneConfig {
        return {
            entities: [this]
        }
    }
    
    querySystem<T extends System<Component>> (type: {new(...args: any[]): T}, engineTag: string) {
        
        let engine = this.sceneManager.queryEngine<T>(engineTag, type)
        if (engine) {
            return engine as T
        }
        return undefined

    }
    querySys (engineTag: string) {
        let engine = this.sceneManager.systems.get(engineTag)
        if (engine) {
            return engine
        }
        return undefined

    }
    queryComponent<T extends Component>(type: {new(...args: any[]): T}, entityTag: string) {
        let entityMap = this.classMap.get(entityTag)
        let componentList: T[] = []
        if (entityMap) {
            let i = 0
            let indices = []
            for (let entity of entityMap) {
                if (i == 0 ) {
                    
                    for (let componentIdx = 0; componentIdx < entity[1].components.length; componentIdx++) {
                        if (entity[1].components[componentIdx] instanceof type) {
                            indices.push(componentIdx)
                        }
                    }
                } 
                for (let idx of indices) {
                    let proposedComponent = entity[1].components[idx]
                    if (proposedComponent instanceof type) {
                        componentList.push(proposedComponent)
                    }
                }

                i++
            }
        } 
        return componentList
    }

    addEntity(entity: Entity): Entity {
        let uniqueId = this.sceneManager.getUniqueId()

        entity.id = uniqueId
        this.addedEntities.push(entity)
        return entity
    }
    executeEntityAdd(entity: Entity) {
        if (!entity.id ) {
            throw new Error()
        }
        entity.scene = this
        let uniqueId = entity.id as number
        this.entities.set(uniqueId, entity)
        let entityMap = this.classMap.get(entity.className)
            if (entityMap) {
                entityMap.set(entity.id as number, entity)
            } else {
                let newMap = new Map()
                newMap.set(entity.id, entity)
                this.classMap.set(entity.className, newMap)
            }
        
        for (let comp of entity.components) {
            let compList = this.querySys(comp.engineTag)
            comp.entity = entity.id
            if (compList) {
                let system: System<Component> | undefined= this.sceneManager.systems.get(comp.engineTag)
                if (system) {
                    let id = this.getUniqueComponentId()
                    comp.componentId = id
                    system.register(comp, id)

                } 


                
            } else {
                console.log(comp.engineTag + "does not exist")

                
            }
    }

    
    return entity
    }
    removeEntity(id: number) {
        // for (let i = this.addedEntities.length - 1; i >=  0; i--) {
        //     let entities= this.addedEntities
        //     if (entities[i].id == id) {
        //         if (entities.length == 1 ) {
        //             this.addedEntities.pop()
        //             return
        //         }
        //         entities[i]= this.addedEntities[this.addedEntities.length - 1]
        //         this.addedEntities.pop()
        //         console.log("Found Deleted Entity ")
        //         return
        //     }
        // }
        this.removedEntities.push(id)
    }
    private executeEntityRemove(id : number) {
        let entity : Entity | undefined = this.entities.get(id)
    
    if (entity) {
        this.entities.delete(id)

        for (let c of entity.components) {

            if (this.querySys(c.engineTag)) {
                c.system.unregister(c.componentId as number) 
            }
            
            
        }
        
        
        
    } else {
        
        console.error("Entity not found " + id)
        // throw new Error("Entity not found " + id)
    }

    return entity
    }
    addServerEntity( entity: Entity) {
        if (entity.id == null || entity.id == undefined) {
            throw new Error("Entity id is undefined")
        }
        let scene: Scene = this
        entity.scene = scene
        scene.entities.set(entity.id as number, entity)
        let entityMap = this.classMap.get(entity.className)
        if (entityMap) {
            entityMap.set(entity.id, entity)
        } else {
            let newMap = new Map()
            newMap.set(entity.id, entity)
            this.classMap.set(entity.className, newMap)
        }
        if (scene.newEntityQueue) {
            let isInQueue = scene.newEntityQueue.has(entity.id as number)
            if (!isInQueue) {
                for (let comp of entity.components) {
                    comp.entity = entity.id
                    let compList = this.querySys(comp.engineTag)
                    if (compList) {
            
                        let system: System<Component> | undefined= scene.sceneManager.systems.get(comp.engineTag)
                        if (system) {
                            let id = this.getUniqueComponentId()
                            comp.componentId = id
                            system.register(comp, id)
                        } 
            
                        
                    } else {
                        console.log(comp.engineTag + " tagged System is not found")
                        
                    }
                }

            }
            
            return entity
        } else {
        
            for (let comp of entity.components) {
                let compList = this.querySys(comp.engineTag)
                if (compList) {
                    comp.entity = entity.id
                    let system: System<Component> | undefined= scene.sceneManager.systems.get(comp.engineTag)
                    if (system) {
                        // They already have component ids stored in the components
                        // Therefore, no need to create new Ones
                        system.register(comp, 0)
                    } 
        
                    
                } else {
                    console.log(comp.engineTag + " tagged System is not found")
                    
                }
            }
            console.log("successfully added entitys")
            return entity
        }
        
    }
    getUniqueId() {
        if (SceneManager.EngineType == EngineType.SOCKETCLIENT) {
            let id = this.id - 1
            this.id--
            return id
        } else {
            let id = this.id  + 1
            this.id++
            return id
        }
        
    }
    getUniqueComponentId() {
        if (SceneManager.EngineType == EngineType.SOCKETCLIENT) {
            let id = this.componentId - 1
            this.componentId--
            return id
        } else {
            let id = this.componentId + 1
            this.componentId++
            return id
        }
        
    }
    clone() {
        return this
    }
}
// For client Class
