

import { SceneManager } from "./managers/SceneManager.js"
import { Component } from "../types/components.js"
import { SceneConfig } from "./config.js"
import { Entity} from "../types/Entity.js"
import { System } from "../types/system.js"
import { EntityManager } from "./managers/EntityManager.js"

export interface Scene {
    name: string

    sceneManager: SceneManager
    background?: string
    time: number
    entities: Map<number, Entity>
    engineComponents: Map<string, Map<number, Component>>
    addEntity: (scene: Scene, entity: Entity, id: number) => Entity

}
