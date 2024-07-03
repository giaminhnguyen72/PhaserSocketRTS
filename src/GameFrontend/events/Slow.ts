import { Script } from "../../engine/src/systems/scripting/components/Script.js"
import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js"
import { ScriptOperable } from "../../engine/src/systems/scripting/types/Operations.js"
export class Slow {
    duration: number = 0
    scriptID: number = 0
    multiplier: number = 0.8
    totalTime: number = 0
}
export class SlowSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let slow = scriptingEngine.operations.dataManager.query<Slow>(Slow)
        slow?.iterate((slowComponent) => {
            let s = scriptingEngine.components.get(slowComponent[1].scriptID)
            if (s) {
                let m = s.get("Modifier")
                m.speed *= slowComponent[1].multiplier
            }
            if (slowComponent[1].duration <= slowComponent[1].totalTime) {
                scriptingEngine.operations.removeEntity(slowComponent[0])
            } else {
                slowComponent[1].totalTime += dt
            }

        })
    }

}