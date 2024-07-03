import { Component } from "../../types/components.js";
import { EngineConfig, SceneConfig } from "../config.js";
import { Entity } from "../../types/Entity.js";
import { Scene, Stage } from "../scene.js";
import { System } from "../../types/system.js";
import { EngineType } from "../../constants/engineType.js";
import { SocketManager } from "../../systems/MultiplayerClient/SocketManager.js";
import { Engine } from "../engine.js";
import { SocketServerManager } from "../../systems/MultiplayerServer/SocketServerManager.js";
import e from "express";
import { ResourceManager } from "./ResourceManager.js";
import { Resource } from "../Resource.js";


export class SceneManager {
    currScene!: Scene
    scenes: Map<string, Scene> = new Map()
    resourceManager: ResourceManager = new ResourceManager()
    currentIdx!: string
    id: number = 0
    componentId = 0
    static EngineType:EngineType = EngineType.CLIENTONLY

    systems: Map<string, System<Component>>
    engineConfig: EngineConfig
    engine:Engine
    constructor(engine: Engine, engineConfig: EngineConfig,  systems: System<Component>[]) {
        this.engine = engine
        this.systems = new Map<string, System<Component>>()

        this.engineConfig = engineConfig
        let engineType = engineConfig.engineType
        if (engineType == EngineType.SOCKETCLIENT) {

            SceneManager.EngineType = EngineType.SOCKETCLIENT
                
        } else if (engineType == EngineType.SOCKETSERVER){

            SceneManager.EngineType = EngineType.SOCKETSERVER
            //systems.push(new SocketServerManager(this))
        } else {
            SceneManager.EngineType = EngineType.CLIENTONLY
        }

        this.addScene()


        
        
        

    }
    load<T extends Resource>(type: new (...param: any[]) => T, name: string) {
        return this.resourceManager.load<T>(type, name)
    }
    loadResource<T extends Resource>(type: new (n: string) => T, name: string) {
        return this.resourceManager.loadResource<T>(type, name)
    }
    addResource<T extends Resource>(type: new (n: string) => T, name: string) {
        return this.resourceManager.addResource<T>(type, name)
    }
    removeResource<T extends Resource>(type: new (n: string) => T, name: string)  {
        return this.resourceManager.removeResource<T>(type, name)
    }
    loadDataResource<T extends Resource>(type: new () => T, name: string) {
        return this.resourceManager.loadDataResource<T>(type, name)
    }
    addDataResource<T extends Resource>(type: new () => T, name: string) {
        return this.resourceManager.addDataResource<T>(type, name)
    }
    addCreatedResource<T extends Resource>(type: new (...params: any[]) => T,data: T, name: string) {
        return this.resourceManager.addCreatedResource<T>(type, data,name)
    }
    removeDataResource<T extends Resource>(type: new () => T, name: string)  {
        return this.resourceManager.removeDataResource<T>(type, name)
    }
    addScene() : void {
        if ( this.engineConfig.sceneConfig) {
            let newConfig:Scene = new this.engineConfig.sceneConfig[0](this, [])
            let newScene = newConfig
            newScene.sceneManager = this

            this.currScene = (newScene)

            this.currentIdx =newScene.name
            
            
            console.log("In Scene Manager")

            
            this.scenes.set(newScene.name, newScene)
            for (let i = 1; i < this.engineConfig.sceneConfig.length; i++) {
                let newConfig:Scene = new this.engineConfig.sceneConfig[i](this,[])
                let newScene = newConfig
                newScene.sceneManager = this

    
                
                
                console.log("In Scene Manager")
    
                
                this.scenes.set(newScene.name, newScene)
    
                
            }
            
        } else {
            throw new Error(" No scene found")
        }
    }
    initialize(systems: System<Component>[]) {
        for (let sys of systems) {
            sys.sceneManager = this
        }
    }
    queryEngine<T extends System<Component>>(engineTag: string, type: {new(...args: any[]) : T}) {
        let engine = this.systems.get(engineTag)
        if (engine && engine instanceof type) {
            return engine
        } else {
            return undefined
        }

    }
    switchScenes(key: string) {
        let scene : Scene | undefined= this.scenes.get(key)
        if (scene) {
            for (var sys of this.systems) {
                

                
            }
        }
        
    }
    getCurrentScene(): Scene {
        return  this.currScene
        
    }
    setScene(idx: string) {
        let scene = this.scenes.get(idx)
        if (scene) {
            this.currScene = scene
            this.currentIdx = idx
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
}


