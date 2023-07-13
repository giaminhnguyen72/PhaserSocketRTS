import { Script } from "../../components/Script/Script.js";
import { EngineType } from "../../constants/engineType.js";
import { SceneManager } from "../../core/managers/SceneManager.js";
import { System } from "../../types/system.js";
export class ScriptingEngine implements System<Script> {
    tag: string ="SCRIPTING"  ;
    components: Map<number, Script>;
    deleted: Script[] = []
    engineType: EngineType
    constructor(engineType: EngineType) {
        this.components = new Map<number, Script>()
        this.engineType = engineType
    }
    register(comp: Script): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
        }  else {
            comp.componentId = comp.componentId
            comp.system = this
            this.components.set(comp.componentId, comp)
        }
    }
    unregister(comp: number): void {
        let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)

       }
    
    }
    
    update(dt: number): void {
        console.log("Scripting engine running")
        console.log("Scripting Components: " + this.components.size)
        for (let comp of this.components) {
            if (comp[1].engineType == this.engineType) {
                comp[1].callback(dt)
            }
            
        }
        while (this.deleted.length > 0 ) {
            let comp = this.deleted.pop()
            this.components.delete(comp?.componentId as number)
        }

    }

}