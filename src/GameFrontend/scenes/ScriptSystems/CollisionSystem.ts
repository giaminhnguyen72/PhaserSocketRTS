import { ScriptingEngine } from "../../../engine/src/systems/scripting/ScriptingEngine";
import { ScriptOperable } from "../../../engine/src/systems/scripting/types/Operations";
import { Collision } from "../Events/Events";

class CollisionSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let col = scriptingEngine.operations.dataManager.query<Collision>(Collision)
        
    }
    
}