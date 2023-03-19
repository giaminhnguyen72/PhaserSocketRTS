import { ContextInfo } from "../../core/context.js";
import { Component, Renderable } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";

export class Text implements Renderable {
    entity!: number;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    text: string
    visible: boolean = true;
    alive: boolean = true;
    system!: System<Component>;
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {

    }
    constructor(text: string) {

        this.text = text
    }
    rendered: boolean = false;
    copy<T>(text: Text): void {
        this.componentId = text.componentId
        this.entity = text.entity
        this.text = text.text

    }
    context!: ContextInfo;
    render(ctx: CanvasRenderingContext2D): void {
        if (ctx) {
            ctx.fillText(this.text, 20, 20)
        }
    }
    initialize() {

    }
    toJson() {
        return {
            entity: this.entity,
            engineTag: this.engineTag,
    componentId: this.componentId,
    text: this.text,
    visible: this.visible,
    alive: this.alive
        }
    }
    
    
}