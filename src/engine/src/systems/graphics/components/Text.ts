import { ContextInfo } from "../../../core/context.js";
import { Component, Renderable } from "../../../types/components.js";
import { Vector3 } from "../../../types/components/physics/transformType.js";
import { Entity } from "../../../types/Entity.js";
import { System } from "../../../types/system.js";
import { Transform } from "../../physics/components/transform";
import { Camera } from "./2d/Camera.js";

export class Text implements Renderable {
    entity!: number;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    text: string
    visible: boolean = true;
    alive: boolean = true;
    system!: System<Component>;
    pos: Vector3
    children: [] = []
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {

    }
    
    constructor(text: string = "") {
        this.pos = {x:0, y:0, z:0}
        this.text = text
    }
    unmount(): void {
        
    }

    rendered: boolean = false;
    copy<T>(text: Text): void {
        this.componentId = text.componentId
        this.entity = text.entity
        this.text = text.text
        this.pos.x = this.pos.x
        this.pos.y = this.pos.y

    }
    context!: ContextInfo;
    render(cam: Camera): void {
        if (this.context) {
            this.context.ctx.fillText(this.text, this.pos.x - cam.pos.x, this.pos.y - cam.pos.y)
        } 
    }
    initialize() {


    }
    getRectangle() {
        return {
            pos: this.pos,
            dim: {length: 0, height: 0},
            rot: 0
        }
    }
    toJson() {
        return {
            entity: this.entity,
            engineTag: this.engineTag,
            componentId: this.componentId,
            text: this.text,
            visible: this.visible,
            alive: this.alive,
            pos: this.pos
        }
    }
    
    
}