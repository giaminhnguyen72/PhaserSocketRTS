
import { Component, Renderable,  } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { Scene } from "../../core/scene.js";
import { Transform } from "../Physics/transform.js";
import { System } from "../../types/system.js";
import { ContextInfo } from "../../core/context.js";

export class Sprite implements Component, Renderable {
    entity: number;
    componentId?: number;
    engineTag: string = "GRAPHICS"
    transform: Transform
    
    context!: ContextInfo
    image!: HTMLImageElement
    src: string
    constructor(entity: number, transform: Transform, src:string) {
        this.entity = entity

        this.transform = transform

        this.src = src
        

    }
    rendered: boolean = false;
    
    copy(element:Sprite): void {
        this.componentId = element.componentId
        this.entity = element.entity
        this.src = element.src
        this.transform.accel.x   = element.transform.accel.x,
        this.transform.accel.y = element.transform.accel.y,
        this.transform.accel.z = element.transform.accel.z,

        this.transform.vel.x = element.transform.vel.x
        this.transform.vel.y = element.transform.vel.y
        this.transform.vel.z = element.transform.vel.z

        this.transform.pos.x = element.transform.pos.x
        this.transform.pos.y = element.transform.pos.y
        this.transform.pos.z = element.transform.pos.z


    }
    visit(element: Sprite) {

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
    toJSON() {
        return {
            entity: this.entity,
            componentId: this.componentId,
            engineTag: this.engineTag,
            transform: this.transform,
            visible: this.visible,
            alive: this.alive,
            src: this.src,
            
        }
    }
    
}
