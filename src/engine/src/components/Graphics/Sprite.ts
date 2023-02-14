
import { Component, Renderable,  } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../../core/scene.js";
import { Transform } from "../Physics/transform.js";
import { System } from "../../types/system.js";
import { ContextInfo } from "../../core/context.js";

export class Sprite implements Component, Renderable {
    entity: Entity;
    componentId?: number;
    engineTag: string = "GRAPHICS"
    transform: Transform
    component: Component;
    context!: ContextInfo
    image!: HTMLImageElement
    src: string
    constructor(entity: Entity, transform: Transform, src:string) {
        this.entity = entity

        this.transform = transform
        this.component = this
        this.src = src
        

    }
    visible: boolean = true;
    alive: boolean = true;
    system!: System<Component>;
    
    render(ctx?: CanvasRenderingContext2D): void {
        if (ctx) {
            ctx.drawImage(this.image, this.transform.pos.x, this.transform.pos.y, 64, 64)
        }
        
    }

    update(dt: number): void {

    }
    initialize() {
        this.image = new Image()
        this.image.src = this.src
    }
    
}
