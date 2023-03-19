import { ContextInfo } from "../../core/context";
import { Component, Renderable } from "../../types/components";
import { Entity } from "../../types/Entity";
import { System } from "../../types/system";

class Div implements Renderable{
    context!: ContextInfo;
    system!: System<Component>;
    entity: number;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;
    style: string
    divId: string
    hasId: boolean
    constructor(entity: number = -1, divId: string, style: string) {
        this.entity = entity
        this.divId = divId
        this.style = style
        this.hasId = false
    }
    rendered: boolean = false;
    copy<T>(): void {
        throw new Error("Method not implemented.");
    }
    initialize(): void {
        
    }
    
    update(dt: number): void {
        if (this.hasId) {

        } else {
            if (document.getElementById(this.divId) == null) {
                this.hasId = true
            } else {
                
            }
        }
    }
    render(ctx: CanvasRenderingContext2D): void {
        
    }

}