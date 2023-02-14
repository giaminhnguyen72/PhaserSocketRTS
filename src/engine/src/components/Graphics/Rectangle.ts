import { ContextInfo } from "../../core/context.js";
import { Component, Renderable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";
import { Transform } from "../Physics/transform.js";

export class Rectangle implements Component, Renderable{
    entity: Entity;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    transform: Transform
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {

    }
    constructor(entity: Entity, transform: Transform) {
        this.entity = entity
        this.transform = transform
    }
    initialize(): void {
        
    }
    context!: ContextInfo;
    visible: boolean = true;
    alive: boolean = true;
    system!: System<Component>;
    render(ctx: CanvasRenderingContext2D): void {
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

}