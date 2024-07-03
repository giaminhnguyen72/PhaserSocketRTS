import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js"
import { ScriptOperable } from "../../engine/src/systems/scripting/types/Operations.js"

export class Rage {
    staminaAmount: number = 10
    duration: number = 0
    time: number = 0
    rageTime: number = 0
    scriptID: number = 0
    totalTime: number = 0
}
export class RageSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let exp = scriptingEngine.operations.dataManager.query<Rage>(Rage)

        if (exp) {
            exp.iterate((item) => {
                if (item[1].time >= item[1].rageTime) {
                    item[1].time = 0 
                    let s = scriptingEngine.components.get(item[1].scriptID)
                    if (s) {
                        let stamina = s.get("Stamina") + item[1].staminaAmount
                        s.set("Stamina",stamina)
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