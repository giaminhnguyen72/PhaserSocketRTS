import { EngineType } from "../../../constants/engineType.js";
import { ScriptingEngine } from "../ScriptingEngine.js";
import { Component } from "../../../types/components.js";
import { Entity } from "../../../types/Entity.js";
import { System } from "../../../types/system.js";
import { Engine } from "../../../../../engine/src/core/engine.js";
import { ScriptEntity } from "../types/Operations.js";

interface Get {
    get(s: any): Get
    set(s: string, d:any): void
}
export abstract class ScriptObject implements Component {
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    componentId?: number | undefined;
    system!: ScriptingEngine

    abstract copy(component: Component): void 
    engineTag: string = "SCRIPTING";
    engineType: EngineType = EngineType.CLIENTONLY
    abstract className: string 
    abstract destructor(): void
    abstract initialize(system: ScriptingEngine): void 
    abstract update(dt: number): void
    abstract get(s: string) : any
    abstract set(s: string, a: any) : void
}
export class Script implements ScriptObject {
    entity?: number;
    engineTag: string = "SCRIPTING";
    componentId?: number | undefined;
    system!: ScriptingEngine
    engineType: EngineType
    className: string 
    properties: Map<string, any> = new Map()
    callback?: (dt: number, data?: any ) => void
    init?: (engine: ScriptingEngine) => void
    destroy?: () => void
    scriptEntity?: ScriptEntity
    constructor(className: string,  engineType: EngineType = EngineType.CLIENTONLY,callback?: (dt: number, data: any ) => void, init?: (engine: ScriptingEngine) => void,destroy?: ()=> void) {
        this.callback = callback
        this.className = className
        this.engineType = engineType
        this.init = init
        this.destroy = destroy
    }
    set(s: string, a: any): void {
        this.properties.set(s,a)
    }
    get(s: string) {
        return this.properties.get(s)
    }
    copy(script: Script): void {
        this.className = script.className
        this.componentId = script.componentId
        for (const [key, value] of Object.entries(script.properties)) {
            this.properties.set(key, value)
        }



    }
    visible: boolean = true;
    alive: boolean = true;
    destructor() {
        if (this.destroy) {
            this.destroy()
        }
        let deleted = this
        if (deleted.callback) {
            this.system.updateSystems.delete(this.componentId as number)
        }
        if (deleted.destroy) {
            deleted.destroy()
        }
        if (this.scriptEntity) {

        }
        let set = this.system.objectDB.get(deleted.className)
        if (set) {
            set.delete(deleted)
        }
    }
    initialize(system: ScriptingEngine) {
        let list = system.objectDB.get(this.className)
        let comp = this
        if (list) {
            list.add(this)
        } else {
            let set: Set<Script> = new Set()
            set.add(this)
            system.objectDB.set(this.className, set)
        }

        if (comp.callback) {
            system.updateSystems.set(comp.componentId as number, comp)
        }
        if (this.init) {
            this.init(system)
        }

    }
    getClasses(classId: string) {
        let classArr = this.system.objectDB.get(classId);
        if (classArr) {
            return classArr
        }
        return []
    }
    addEntity(entity: Entity): Entity {
        return this.system.sceneManager.getCurrentScene().addEntity(entity)
    }
    addScriptEntity() {
        this.scriptEntity = this.system.operations.addEntity(this.componentId as number)
        return this.scriptEntity
    }
    removeEntity(id: number) {
        this.system.sceneManager.getCurrentScene().removeEntity(id)
    }
    getProperty(property: string) {
        return this.properties.get(property)
    }


    setProperty(property:string, initialValue: any ) {

        this.properties.set(property, initialValue)
    }
    setClass(classID: string) {
        this.className= classID
    }
    setCallBack(func: (dt: number) => void) {
        this.callback = func
    }
    setInit(func: (engine: ScriptingEngine) => void) {
        this.init = func
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (this.callback && this.engineType == Engine.engineConfig.engineType) {
            this.callback(dt)
        }
        
        
    }
    toJSON() {
        return {
            entity: this.entity,
            engineTag: this.engineTag,
            componenId: this.componentId,
            callback: this.callback,
            properties: this.properties
        }
    }
    


}
abstract class Policy{
    
    abstract initialize(scripting: ScriptingEngine): void
    abstract update(dt: number): void

}

// class ScriptPolicy implements Policy {
//     constructor() {
        
//     }
//     initialize(scripting: ScriptingEngine): void {
//         throw new Error("Method not implemented.");
//     }
//     update(dt: number): void {
//         throw new Error("Method not implemented.");
//     }

// }
// export class NativeScript<T extends Policy> extends T {

//     initialize(scripting: ScriptingEngine): void {
//         throw new Error("Method not implemented.");
//     }
//     update(dt: number): void {
//         throw new Error("Method not implemented.");
//     }
//     entity?: number | undefined;
//     visible: boolean = true;
//     alive: boolean = true;
//     engineTag: string = "SCRIPTING";
//     componentId?: number | undefined;
//     system!: System<Component>;
//     copy(component: Component): void {
//         throw new Error("Method not implemented.");
//     }
    
// }