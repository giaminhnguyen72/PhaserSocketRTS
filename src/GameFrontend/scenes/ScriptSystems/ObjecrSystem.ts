import { ScriptingEngine } from "../../../engine/src/systems/scripting/ScriptingEngine";
import { ScriptOperable } from "../../../engine/src/systems/scripting/types/Operations";
import { Collision } from "../Events/Events";

export class ObjectOperation implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        
        let Object = scriptingEngine.queryClass("Object")
        if (Object) {
            for (let i of Object) {
                if (i.get("HP") <= 0) {
                    scriptingEngine.sceneManager.currScene.removeEntity(i.entity as number)
                }
                
            }
        }
        
    }
    
}