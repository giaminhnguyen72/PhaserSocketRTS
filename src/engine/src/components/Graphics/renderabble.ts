import { componentType } from "../../constants/componentType.js";
import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Transform } from "../Physics/transform.js";

class Renderable implements Component {
    entity: Entity;
    componentId: number;
    tag: string = "GRAPHICS"
    transform: Transform
    constructor(entity: Entity, componentId: number, transform: Transform) {
        this.entity = entity
        this.componentId = componentId
        this.transform = transform
    }
    update(dt: number): void {
        throw new Error("Method not implemented.");
    }
    
}