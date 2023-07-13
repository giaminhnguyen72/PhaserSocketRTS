
import { Component } from "../engine/src/types/components.js";
import { SceneManager } from "../engine/src/core/managers/SceneManager.js";
import { Scene } from "../engine/src/core/scene.js";
import { Entity } from "../engine/src/types/Entity.js";

  export class Test implements Scene {
    name: string = "test";
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    entities: Map<number, Entity> = new Map();
    engineComponents: Map<string, Map<number, Component>> = new Map();
     addEntity!: (scene: Scene, entity: Entity) => Entity
     getSceneConfig() {
         return {
          entities: []
         }
     }
 
}