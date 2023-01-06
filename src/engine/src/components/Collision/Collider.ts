import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Transform } from "../Physics/transform.js";

class Collider implements Component {
    entity: Entity;
    engineTag: string = "COLLISION";
    componentId?: number | undefined;
    transform: Transform
    constructor(entity: Entity, transform: Transform, onCollision: (otherCollider: Collider) => void) {
        this.entity = entity
        this.transform = transform
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        
    }

    
}