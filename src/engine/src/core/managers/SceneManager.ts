import { Component } from "../../types/components.js";
import { SceneConfig } from "../config.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../scene.js";
import { System } from "../../types/system.js";

export class SceneManager {
    scenes: Map<string, Scene>
    sceneConfigs: SceneConfig[]
    currentIdx: string
    static id: number = 0
    static componentId = 0
    systems: System<Component>[]
    constructor(config:SceneConfig[]=[new SceneConfig("Default")], systems: System<Component>[], key:string=config[0].name) {
        this.sceneConfigs= config
        this.scenes = new Map<string, Scene>()
        for (var i = 0; i < config.length; i++) {
            var currConfig:SceneConfig = config[i]
            console.log("In Scene Manager")
            console.log(systems)
            this.scenes.set(currConfig.name, new Scene(this, currConfig, systems))
        }
        this.sceneConfigs = config
        this.currentIdx = key
        this.systems = systems
    }
    switchScenes(key: string) {
        let scene : Scene | undefined= this.scenes.get(key)
        if (scene) {
            for (var sys of this.systems) {
                var comp = scene.engineComponents.get(sys.tag)
                if (comp) {
                    sys.components = comp
    
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

    update(dt: number) {
        for (var key of this.scenes) {

            
            key[1].update(dt)
        }
    }
    static getUniqueId() {
        return SceneManager.id++
    }
    static getUniqueComponentId() {
        return SceneManager.componentId++
    }
}
class DefaultScene extends Scene{
    
}

