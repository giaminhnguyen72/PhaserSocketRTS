import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js"
import { ScriptOperable } from "../../engine/src/systems/scripting/types/Operations.js"

export class Regen {
    healAmount: number = 0
    duration: number = 0
    time: number = 0
    regenTime: number = 0
    scriptID: number = 0
    totalTime: number = 0
}
export class RegenSystem implements ScriptOperable {
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let exp = scriptingEngine.operations.dataManager.query<Regen>(Regen)

        if (exp) {
            exp.iterate((item) => {
                if (item[1].time >= item[1].regenTime) {
                    item[1].time = 0 
                    let s = scriptingEngine.components.get(item[1].scriptID)
                    if (s) {
                        let hp = s.get("HP") + item[1].healAmount
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