
import { Transform } from "../components/Physics/transform.js";
import { PHYSICS_TAG } from "../constants/componentType.js";
import { Component } from "../types/components.js";
import { System } from "../types/system.js";

export class PhysicsEngine implements System{
    components: Component[]
    tag: string = PHYSICS_TAG
    constructor() {
        this.components = []
    }
    
    update(dt: number): void {
        for (var comp of this.components) {

            comp.update(dt)
            
        }

    }
}