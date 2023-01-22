import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";

export class Script implements Component {
    entity?: Entity | undefined;
    engineTag: string = "SCRIPTING";
    componentId?: number | undefined;
    callback: (dt: number ) => void
    constructor(callback: (dt: number ) => void) {
        this.callback = callback
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        this.callback(dt)
    }

}