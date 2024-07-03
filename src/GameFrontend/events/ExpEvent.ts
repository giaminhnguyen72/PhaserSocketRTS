import { Script } from "../../engine/src/systems/scripting/components/Script.js"
import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js"
import { ScriptOperable } from "../../engine/src/systems/scripting/types/Operations.js"

export class ExpEvent {
    exp: number = 0
    playerID: number = 0
}
export class ExpSystem implements ScriptOperable{
    update(dt: number, scriptingEngine: ScriptingEngine): void {
        let exp = scriptingEngine.operations.dataManager.query<ExpEvent>(ExpEvent)

        if (exp) {
            exp.iterate((item) => {

                let exp = item[1]
                let entity = scriptingEngine.sceneManager.currScene.entities.get(exp.playerID)
                if (entity) {
                    for (let i of entity.components) {
                        if (i instanceof Script) {
                            let players = scriptingEngine.queryClass("Player")
                            if (players && players.has(i)) {

                                let e = i.get("EXP")
                                i.set("EXP", e + exp.exp)
                            }
                        }
                    }
                    
                } else {
                    
                }
                let e = scriptingEngine.operations.dataManager.removeEntity(item[0])

            })
            
        } else {
            console.log("Cant find container")
        }
    }

}