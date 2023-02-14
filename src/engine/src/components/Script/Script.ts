import { ScriptingEngine } from "../../systems/scripting/ScriptingEngine.js";
import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";

export class Script implements Component {
    entity?: Entity | undefined;
    engineTag: string = "SCRIPTING";
    componentId?: number | undefined;
    system!: System<Component>
    callback: (dt: number ) => void
    constructor(callback: (dt: number ) => void) {
        this.callback = callback
    }
    visible: boolean = true;
    alive: boolean = true;
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        this.callback(dt)
        
    }


}