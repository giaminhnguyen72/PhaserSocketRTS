import { Component, Renderable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Transform } from "../Physics/transform.js";

export class Rectangle implements Component{
    entity: Entity;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    transform: Transform
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (ctx) {
            var r = Math.random()* 255
            var g = Math.random()* 255
            var b = Math.random()* 255
            ctx.fillStyle = `rgb(
                ${r},
                ${g},
                ${b})`;
            ctx.fillRect(this.transform.pos.x, this.transform.pos.y,20,20)

        }
    }
    constructor(entity: Entity, transform: Transform) {
        this.entity = entity
        this.transform = transform
    }

}