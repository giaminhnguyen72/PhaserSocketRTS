import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";

class Text implements Component {
    entity: Entity;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    text: string
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (ctx) {
            ctx.fillText(this.text, 0, 0)
        }
    }
    constructor(entity: Entity,text: string) {
        this.entity = entity
        this.text = text
    }
    
}