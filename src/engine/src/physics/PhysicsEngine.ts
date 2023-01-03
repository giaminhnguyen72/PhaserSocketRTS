import { componentType } from "../constants/componentType";
import { Component } from "../types/components";
import { System } from "../types/system";

export class PhysicsEngine implements System{
    components: Component[]
    tag: string = "PHYSICS"
    constructor() {
        this.components = []
    }
    
    update(dt: number): void {
        for (var comp of this.components) {
            comp.update(dt)
        }
    }
}