
import { Component, Renderable,  } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../../core/scene.js";
import { Transform } from "../Physics/transform.js";

export class Sprite implements Component, Renderable {
    entity: Entity;
    componentId?: number;
    engineTag: string = "GRAPHICS"
    transform: Transform
    component: Component;

    image: HTMLImageElement
    constructor(entity: Entity, transform: Transform, src:string) {
        this.entity = entity

        this.transform = transform
        this.component = this
        this.image = new Image()
        this.image.src = src

    }
    
    render(ctx?: CanvasRenderingContext2D): void {
        if (ctx) {
            ctx.drawImage(this.image, 0, 0, 20, 20)
        }
        
    }

    update(dt: number, ctx?: CanvasRenderingContext2D): void {

       this.render(ctx)
    }
    
}
