import { ContextInfo } from "../../core/context.js";
import { Component, Renderable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";

class Text implements Renderable {
    entity: Entity;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    text: string
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {

    }
    constructor(entity: Entity,text: string) {
        this.entity = entity
        this.text = text
    }
    context!: ContextInfo;
    render(ctx: CanvasRenderingContext2D): void {
        if (ctx) {
            ctx.fillText(this.text, 0, 0)
        }
    }
    initialize() {

    }
    
    visible: boolean = true;
    alive: boolean = true;
    system!: System<Component>;
    
}