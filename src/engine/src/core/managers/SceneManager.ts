import { SceneConfig } from "../../types/config.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../../types/scene.js";
import { System } from "../../types/system.js";

export class SceneManager {
    scenes: Scene[]
    sceneConfigs: SceneConfig[]
    currentIdx: number
    static id: number = 0
    static componentId = 0
    constructor(config:SceneConfig[]=[new SceneConfig("Default")], systems: System[], index:number=0) {
        this.sceneConfigs= config
        this.scenes = []
        for (var i = 0; i < config.length; i++) {
            var currConfig:SceneConfig = config[i]
            console.log("In Scene Manager")
            console.log(systems)
            this.scenes.push(new Scene(currConfig, systems))
        }
        this.sceneConfigs = config
        this.currentIdx = index
    }
    switchScenes(index: number) {
        this.currentIdx = index
        return this.getCurrentScene()
    }
    getCurrentScene() {
        return this.scenes[this.currentIdx]
    }
    getCurrentEntities() {
        return this.scenes[this.currentIdx].entities
    }
    addCurrentEntity(entity: Entity) {

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