import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js"
import { ScriptOperable } from "../../engine/src/systems/scripting/types/Operations.js"

export class Poison {
    damageAmount: number = 0
    duration: number = 0
    time: number = 0
    poisonTime: number = 0
    scriptID: number = 0
    totalTime: number = 0
}
export class PoisonSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let exp = scriptingEngine.operations.dataManager.query<Poison>(Poison)

        if (exp) {
            exp.iterate((item) => {
                if (item[1].time >= item[1].poisonTime) {
                    item[1].time = 0 
                    let s = scriptingEngine.components.get(item[1].scriptID)
                    if (s) {
                        let hp = s.get("HP") - item[1].damageAmount
                        s.set("HP",hp)
                    }
                }
                
                if (item[1].totalTime >= item[1].duration) {
                    scriptingEngine.operations.removeEntity(item[0])
                }
                item[1].totalTime += dt
                item[1].time += dt
                

            })
        }
            
    }
}