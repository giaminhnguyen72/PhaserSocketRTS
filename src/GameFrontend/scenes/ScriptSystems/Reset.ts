import { ScriptingEngine } from "../../../engine/src/systems/scripting/ScriptingEngine";
import { ScriptOperable } from "../../../engine/src/systems/scripting/types/Operations";
import { Collision } from "../Events/Events";

export class ModifierOperation implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let players = scriptingEngine.queryClass("Player")
        if (players) {
            for (let i of players) {
                let modifier = i.get("Modifier")
                modifier.speed = 1
            }
        }
        let livable = scriptingEngine.queryClass("Livable")
        if (livable) {
            for (let i of livable) {
                let modifier = i.get("Modifier")
                modifier.speed = 1
            }
        }
        
    }
    
}