import { Component } from "../../types/components.js";
import { EngineConfig, SceneConfig } from "../config.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../scene.js";
import { System } from "../../types/system.js";
import { addEntity, addSocketEntity } from "../sceneUtils.js";
import { EngineType } from "../../constants/engineType.js";
import { SocketManager } from "./SocketManager.js";
import { Engine } from "../engine.js";
import { SocketServerManager } from "./SocketServerManager.js";
import e from "express";

export class SceneManager {
    static sceneManager: SceneManager
    static scenes: Map<string, Scene> = new Map()
    sceneConfigs: Scene[]
    static currentIdx: string
    static id: number = 0
    static componentId = 0
    static EngineType:EngineType = EngineType.CLIENTONLY
    systems: System<Component>[]
    systemTag: Map<string, System<Component>>
    engineConfig: EngineConfig
    addEntity: (scene: Scene, entity: Entity) => Entity
    constructor(engineConfig: EngineConfig, scenes:Scene[]=[], systems: System<Component>[]) {
        this.systems = systems
        this.systemTag = new Map<string, System<Component>>()
        SceneManager.sceneManager = this
        this.engineConfig = engineConfig
        let engineType = engineConfig.engineType
        if (engineType == EngineType.SOCKETCLIENT) {
            this.addEntity = addSocketEntity
            SceneManager.EngineType = EngineType.SOCKETCLIENT
                
        } else if (engineType == EngineType.SOCKETSERVER){
            this.addEntity = addEntity
            SceneManager.EngineType = EngineType.SOCKETSERVER
            //systems.push(new SocketServerManager(this))
        } else {
            this.addEntity = addEntity
            SceneManager.EngineType = EngineType.CLIENTONLY
        }

        for (let i = 0; i < scenes.length; i++) {
            let newConfig:Scene = scenes[i]
            let newScene = newConfig
            newScene.sceneManager = this
            newScene.engineComponents = new Map()
            newScene.addEntity = this.addEntity
            
            
            console.log("In Scene Manager")

            
            SceneManager.scenes.set(newScene.name, newScene)

            
        }
        this.sceneConfigs = scenes
        SceneManager.currentIdx = this.sceneConfigs[0].name
        this.systems = systems
    }
    switchScenes(key: string) {
        let scene : Scene | undefined= SceneManager.scenes.get(key)
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
        let curr = SceneManager.scenes.get(SceneManager.currentIdx)
        if (curr) {
            return  curr
        } else {
            throw Error("Cant get current scene")
        }
        
    }

    static getInstance() {
        return SceneManager.sceneManager
    }
    static getUniqueId() {
        if (SceneManager.EngineType == EngineType.SOCKETCLIENT) {
            let id = SceneManager.id - 1
            SceneManager.id--
            return id
        } else {
            let id = SceneManager.id  + 1
            SceneManager.id++
            return id
        }
        
    }
    static getUniqueComponentId() {
        if (SceneManager.EngineType == EngineType.SOCKETCLIENT) {
            let id = SceneManager.componentId - 1
            SceneManager.componentId--
            return id
        } else {
            let id = SceneManager.componentId + 1
            SceneManager.componentId++
            return id
        }
        
    }
}


