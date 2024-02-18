
import { Position, Vector3 } from "../../../engine/src/types/components/physics/transformType.js";
import { Rectangle } from "../../../engine/src/systems/graphics/components/Rectangle.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Rectangle as Shape } from "../../../engine/src/types/components/collision/shape.js";
export class RectangleEntity implements Entity {
    components: Component[] =[];
    rectangle: Rectangle
    pos: Vector3
    dim: {length: number, height:number}
    className: string = "RECTANGLE";
    constructor(pos: Vector3, dim: {length: number, height: number}) {
        let rect = new Rectangle({pos: pos, dim: dim, rot: 0})
        this.rectangle = rect
        this.pos = rect.shape.pos
        this.dim = rect.shape.dim
        this.components.push(rect)
    }
    
    getRectangle() {
        return {
            pos: this.pos,
            dim: this.dim,
            rot: 0
        }
    }
    clone() {
        return new RectangleEntity(this.pos, this.dim)
    }
}