import { Component } from "../../types/components.js";
import { EngineConfig, SceneConfig } from "../config.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../scene.js";
import { System } from "../../types/system.js";
import { addEntity, addSocketEntity } from "../sceneUtils.js";
import { EngineType } from "../../constants/engineType.js";
import { SocketManager } from "./SocketManager.js";
import { Engine } from "../engine.js";

export class SceneManager {
    scenes: Map<string, Scene>
    sceneConfigs: SceneConfig[]
    currentIdx: string
    static id: number = 0
    static componentId = 0
    systems: System<Component>[]
    systemTag: Map<string, System<Component>>
    engineConfig: EngineConfig
    addEntity: (scene: Scene, entity: Entity, id: number) => Entity
    constructor(engineConfig: EngineConfig, scenes:SceneConfig[]=[], systems: System<Component>[]) {
        this.systems = systems
        this.systemTag = new Map<string, System<Component>>()
        this.scenes = new Map<string, Scene>()
        this.engineConfig = engineConfig
        let engineType = engineConfig.engineType
        if (engineType == EngineType.SOCKETCLIENT) {
            this.addEntity = addEntity
            systems.push(new SocketManager(this)
                )
        } else {
            this.addEntity = addSocketEntity
        }
        for (let i = 0; i < scenes.length; i++) {
            let newConfig:SceneConfig = scenes[i]
            let newScene = newConfig.scene
            newScene.sceneManager = this
            newScene.engineComponents = new Map()
            newScene.entities = new Map()
            console.log("In Scene Manager")

            
            this.scenes.set(newScene.name, newScene)

            for (var system of systems) {
                this.systemTag.set(system.tag, system)
                newScene.engineComponents.set(system.tag, system.components)
            }

            for (var e of newConfig.entities) {
                
                addEntity(newScene, e)
                
            }
        }
        this.sceneConfigs = scenes
        this.currentIdx = this.sceneConfigs[0].scene.name
        this.systems = systems
    }
    switchScenes(key: string) {
        let scene : Scene | undefined= this.scenes.get(key)
        if (scene) {
            for (var sys of this.systems) {
                var comp = scene.engineComponents.get(sys.tag)
                if (comp) {
                   
    
                } else {
                    throw Error("error in start method")
                }
                
            }
        }
        
    }
    getCurrentScene() {
        let curr = this.scenes.get(this.currentIdx)
        if (curr) {
            return  curr
        } else {
            throw Error("Cant get current scene")
        }
        
    }


    static getUniqueId() {
        return SceneManager.id++
    }
    static getUniqueComponentId() {
        return SceneManager.componentId++
    }
}


class DefaultScene implements Scene {
    addEntity!: (scene: Scene, entity: Entity, id: number) => Entity;
    name: string = "scene";
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    entities: Map<number, Entity> = new Map();
    engineComponents: Map<string, Map<number, Component>> = new Map();
    
    
}