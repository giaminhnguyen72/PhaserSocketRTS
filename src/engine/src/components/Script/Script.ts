import { EngineType } from "../../constants/engineType.js";
import { ScriptingEngine } from "../../systems/scripting/ScriptingEngine.js";
import { Component } from "../../types/components.js";
import { Entity } from "../../types/Entity.js";
import { System } from "../../types/system.js";

export class Script implements Component {
    entity?: number;
    engineTag: string = "SCRIPTING";
    componentId?: number | undefined;
    system!: System<Component>
    engineType: EngineType
    callback: (dt: number ) => void
    constructor(callback: (dt: number ) => void, engineType: EngineType = EngineType.CLIENTONLY) {
        this.callback = callback
        this.engineType = engineType
    }
    copy<Script>(script: Script): void {
        
    }
    visible: boolean = true;
    alive: boolean = true;
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {

        this.callback(dt)
        
    }
    toJSON() {
        return {
            entity: this.entity,
            engineTag: this.engineTag,
            componenId: this.componentId,
            callback: this.callback
        }
    }
    


}